# FeelClick - One-handed Web Scrolling Experience

[Tiếng Việt](README_VI.md) | [日本語](README_JA.md)

> **Version**: 0.1.0 Beta

FeelClick is a Chrome extension designed to help users browse the web easily with just one hand or when the mouse wheel is broken. With the smart "Scroll Zone", you can perform smooth scrolling operations through simple mouse clicks.

## 🌟 Key Features

- **Scroll Zone**: A transparent overlay that can be moved and placed anywhere on the screen.
- **5 Flexible Scrolling Modes**: Customize left/right click actions to suit your habits.
- **Drag & Drop & Lock Position**: Easily move the scroll zone to a convenient position and lock it to avoid accidental movement.
- **Modern Interface**: Exquisite Glassmorphism design, not obstructing the view.
- **Save Configuration**: Automatically remembers your position and settings.

## 🎮 Control Modes

The extension provides 5 different control modes, which can be quickly changed via the Popup:

1.  **Mode 1 (Default)**:
    - Left Click: Scroll Up
    - Right Click: Scroll Down
2.  **Mode 2**:
    - Left Click: Scroll Down
    - Right Click: Scroll Up
3.  **Mode 3 (Split Left/Right)**:
    - Click Left half of zone: Scroll Up
    - Click Right half of zone: Scroll Down
4.  **Mode 4 (Split Top/Bottom)**:
    - Click Top half of zone: Scroll Up
    - Click Bottom half of zone: Scroll Down
5.  **Mode 5 (Continuous Scroll)**:
    - Hold Left Click: Slide down gradually
    - Hold Right Click: Slide up gradually

## 🚀 Installation Guide

1.  Download the source code of FeelClick (or Clone this repository).
2.  Open Chrome browser and go to: `chrome://extensions/`
3.  Turn on **Developer mode** in the top right corner.
4.  Click the **Load unpacked** button.
5.  Select the folder containing the FeelClick source code (the folder containing the `manifest.json` file).
6.  The extension is ready to use!

## 💡 Usage Guide

1.  After installation, the FeelClick icon will appear on the toolbar.
2.  Open any website (or reload the current page).
3.  You will see a translucent box (Scroll Zone) appear (default is in the right corner).
4.  **Move**: Click and hold the Left Mouse button on the scroll zone and drag to change position.
5.  **Lock/Unlock**: Click the small lock icon on the scroll zone to fix the position.
6.  **Change Mode**: Click the extension icon on the toolbar to open the Settings Menu and select the desired mode.

## 📂 Folder Structure

- `manifest.json`: Main configuration file of the extension.
- `popup.html`, `popup.css`, `popup.js`: Interface and logic of the settings window.
- `content.js`, `content.css`: Script and interface of the Scroll Zone embedded in the website.
- `icons/`: Folder containing application icons.

---
*Developed with ❤️ to bring a more convenient web browsing experience.*
