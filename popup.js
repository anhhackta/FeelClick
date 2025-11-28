document.addEventListener('DOMContentLoaded', () => {
    const enableCheckbox = document.getElementById('enable-extension');
    const modeRadios = document.querySelectorAll('input[name="mode"]');
    const resetBtn = document.getElementById('reset-position');

    // Load saved settings
    chrome.storage.local.get(['enabled', 'mode'], (result) => {
        if (result.enabled !== undefined) {
            enableCheckbox.checked = result.enabled;
        }
        if (result.mode) {
            document.querySelector(`input[name="mode"][value="${result.mode}"]`).checked = true;
        }
    });

    // Save settings on change
    enableCheckbox.addEventListener('change', () => {
        const enabled = enableCheckbox.checked;
        chrome.storage.local.set({ enabled: enabled }, () => {
            sendMessageToActiveTab({ type: 'UPDATE_SETTINGS', payload: { enabled: enabled } });
        });
    });

    modeRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            const mode = document.querySelector('input[name="mode"]:checked').value;
            chrome.storage.local.set({ mode: mode }, () => {
                sendMessageToActiveTab({ type: 'UPDATE_SETTINGS', payload: { mode: mode } });
            });
        });
    });

    // Reset position
    resetBtn.addEventListener('click', () => {
        sendMessageToActiveTab({ type: 'RESET_POSITION' });
    });

    function sendMessageToActiveTab(message) {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0]) {
                chrome.tabs.sendMessage(tabs[0].id, message);
            }
        });
    }
});
