"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonBuilder = void 0;
class ButtonBuilder {
    constructor(data) {
        Object.assign(this, data);
    }
    /**
     * Sets the display text for the button.
     * @param displayText The text to be displayed on the button.
     * */
    setDisplayText(displayText) {
        this.text = displayText;
    }
    /**
     * Sets the URL for the button.
     * @param url The URL to be opened when the button is clicked.
     * */
    setUrl(url) {
        this.url = url;
    }
}
exports.ButtonBuilder = ButtonBuilder;
