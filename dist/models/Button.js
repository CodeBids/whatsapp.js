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
    /**
     * Sets the ID for the button.
     * @param id The unique identifier for the button.
     * */
    setId(id) {
        this.id = id;
    }
    /**
     * Sets the type of the button.
     * @param type The type of the button, either 'reply' or 'url'.
     * */
    setType(type) {
        this.type = type;
    }
}
exports.ButtonBuilder = ButtonBuilder;
