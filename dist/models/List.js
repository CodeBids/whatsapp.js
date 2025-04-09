"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListBuilder = void 0;
const Row_1 = require("../models/Row");
class ListBuilder {
    constructor(data) {
        this.title = data.title;
        if (data.rows instanceof Row_1.RowBuilder) {
            this.rows = data.rows.build();
        }
        else {
            this.rows = data.rows || [];
        }
        this.buttonText = data.buttonText;
    }
    /**
     * Sets the title of the list.
     * @param title The title to be set for the list.
     */
    setTitle(title) {
        this.title = title;
        return this;
    }
    /**
     * Sets the rows of the list.
     * @param rows The rows to be set for the list.
     */
    setRows(rows) {
        if (rows instanceof Row_1.RowBuilder) {
            this.rows = rows.build();
        }
        else {
            this.rows = rows;
        }
        return this;
    }
    /**
     * Sets the button text of the list.
     * @param buttonText The button text to be set for the list.
     */
    setButtonText(buttonText) {
        this.buttonText = buttonText;
        return this;
    }
}
exports.ListBuilder = ListBuilder;
