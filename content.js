let settings = {
    enabled: true,
    mode: '1',
    zoneTop: '100px',
    zoneRight: '20px',
    locked: false
};

let scrollInterval = null;
let isDragging = false;
let dragOffset = { x: 0, y: 0 };

// Initialize
chrome.storage.local.get(['enabled', 'mode', 'zoneTop', 'zoneRight', 'locked'], (result) => {
    settings = { ...settings, ...result };
    if (settings.enabled) {
        createZone();
    }
});

// Listen for messages
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'UPDATE_SETTINGS') {
        settings = { ...settings, ...message.payload };
        if (settings.enabled) {
            if (!document.getElementById('feelclick-zone')) {
                createZone();
            } else {
                updateZoneUI();
            }
        } else {
            removeZone();
        }
    } else if (message.type === 'RESET_POSITION') {
        resetPosition();
    }
});

function createZone() {
    if (document.getElementById('feelclick-zone')) return;

    const zone = document.createElement('div');
    zone.id = 'feelclick-zone';
    zone.style.top = settings.zoneTop;
    zone.style.right = settings.zoneRight;
    if (settings.zoneRight === 'auto') {
        zone.style.left = settings.zoneLeft;
    }

    if (settings.locked) zone.classList.add('locked');

    const lockBtn = document.createElement('div');
    lockBtn.className = 'lock-btn';
    lockBtn.innerHTML = settings.locked ? '🔒' : '🔓';
    lockBtn.title = "Toggle Lock Position";
    lockBtn.addEventListener('mousedown', (e) => {
        e.stopPropagation(); // Prevent drag start
    });
    lockBtn.addEventListener('click', toggleLock);
    zone.appendChild(lockBtn);

    const modeIndicator = document.createElement('div');
    modeIndicator.className = 'mode-indicator';
    modeIndicator.innerText = `Mode ${settings.mode}`;
    zone.appendChild(modeIndicator);

    document.body.appendChild(zone);

    // Drag Events
    zone.addEventListener('mousedown', startDrag);

    // Scroll Events
    zone.addEventListener('contextmenu', (e) => e.preventDefault()); // Disable context menu
    zone.addEventListener('mousedown', handleMouseDown);
    zone.addEventListener('mouseup', handleMouseUp);
    zone.addEventListener('mouseleave', stopContinuousScroll);
}

function removeZone() {
    const zone = document.getElementById('feelclick-zone');
    if (zone) zone.remove();
}

function updateZoneUI() {
    const zone = document.getElementById('feelclick-zone');
    if (!zone) return;

    const indicator = zone.querySelector('.mode-indicator');
    if (indicator) indicator.innerText = `Mode ${settings.mode}`;
}

function toggleLock() {
    settings.locked = !settings.locked;
    chrome.storage.local.set({ locked: settings.locked });

    const zone = document.getElementById('feelclick-zone');
    const lockBtn = zone.querySelector('.lock-btn');

    if (settings.locked) {
        zone.classList.add('locked');
        lockBtn.innerHTML = '🔒';
    } else {
        zone.classList.remove('locked');
        lockBtn.innerHTML = '🔓';
    }
}

function startDrag(e) {
    if (settings.locked) return;
    // Only drag on left click and if not clicking a button
    if (e.button !== 0 || e.target.closest('.lock-btn')) return;

    isDragging = true;
    const zone = document.getElementById('feelclick-zone');
    const rect = zone.getBoundingClientRect();
    dragOffset.x = e.clientX - rect.left;
    dragOffset.y = e.clientY - rect.top;

    document.addEventListener('mousemove', onDrag);
    document.addEventListener('mouseup', stopDrag);
}

function onDrag(e) {
    if (!isDragging) return;
    const zone = document.getElementById('feelclick-zone');

    // Calculate new position
    let newTop = e.clientY - dragOffset.y;
    let newLeft = e.clientX - dragOffset.x;

    // Boundary checks
    const maxTop = window.innerHeight - zone.offsetHeight;
    const maxLeft = window.innerWidth - zone.offsetWidth;

    newTop = Math.max(0, Math.min(newTop, maxTop));
    newLeft = Math.max(0, Math.min(newLeft, maxLeft));

    zone.style.top = `${newTop}px`;
    zone.style.left = `${newLeft}px`;
    zone.style.right = 'auto'; // Clear right since we are positioning with left
}

function stopDrag() {
    if (!isDragging) return;
    isDragging = false;
    document.removeEventListener('mousemove', onDrag);
    document.removeEventListener('mouseup', stopDrag);

    const zone = document.getElementById('feelclick-zone');
    settings.zoneTop = zone.style.top;
    settings.zoneLeft = zone.style.left;
    settings.zoneRight = 'auto';

    chrome.storage.local.set({
        zoneTop: settings.zoneTop,
        zoneLeft: settings.zoneLeft,
        zoneRight: 'auto'
    });
}

function resetPosition() {
    settings.zoneTop = '100px';
    settings.zoneRight = '20px';
    settings.zoneLeft = 'auto'; // Clear left

    chrome.storage.local.set({
        zoneTop: '100px',
        zoneRight: '20px'
    }); // Don't save 'auto' left if not needed, or just rely on CSS default if we remove inline style

    const zone = document.getElementById('feelclick-zone');
    if (zone) {
        zone.style.top = '100px';
        zone.style.right = '20px';
        zone.style.left = 'auto';
    }
}

// --- Scrolling Logic ---

function handleMouseDown(e) {
    if (isDragging) return;
    if (e.target.closest('.lock-btn')) return;

    // Prevent default text selection etc.
    e.preventDefault();

    const mode = settings.mode;
    const zone = document.getElementById('feelclick-zone');
    const rect = zone.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const width = rect.width;
    const height = rect.height;

    if (mode === '5') {
        // Mode 5: Continuous Scroll
        if (e.button === 0) { // Left Click -> Down
            startContinuousScroll(10);
        } else if (e.button === 2) { // Right Click -> Up
            startContinuousScroll(-10);
        }
    } else {
        // Click-based modes (trigger on mousedown for responsiveness, or mouseup? User said "click", but mousedown feels faster. Let's stick to click logic but maybe execute on mousedown for immediate feel, or handle single clicks)
        // Actually, for "click" usually means press and release. But for scrolling, immediate reaction on mousedown is often preferred. 
        // Let's implement single scroll on mousedown for modes 1-4.

        let scrollAmount = 300; // Standard scroll amount
        let direction = 0; // 1 for down, -1 for up

        if (mode === '1') {
            // 1: Left Up / Right Down
            if (e.button === 0) direction = -1;
            else if (e.button === 2) direction = 1;
        } else if (mode === '2') {
            // 2: Left Down / Right Up
            if (e.button === 0) direction = 1;
            else if (e.button === 2) direction = -1;
        } else if (mode === '3') {
            // 3: Split Left/Right (Left Up, Right Down)
            if (x < width / 2) direction = -1;
            else direction = 1;
        } else if (mode === '4') {
            // 4: Split Top/Bottom (Top Up, Bottom Down)
            if (y < height / 2) direction = -1;
            else direction = 1;
        }

        if (direction !== 0) {
            window.scrollBy({
                top: direction * scrollAmount,
                behavior: 'smooth'
            });
        }
    }
}

function handleMouseUp(e) {
    if (settings.mode === '5') {
        stopContinuousScroll();
    }
}

function startContinuousScroll(speed) {
    if (scrollInterval) clearInterval(scrollInterval);
    scrollInterval = setInterval(() => {
        window.scrollBy(0, speed);
    }, 16); // ~60fps
}

function stopContinuousScroll() {
    if (scrollInterval) {
        clearInterval(scrollInterval);
        scrollInterval = null;
    }
}
