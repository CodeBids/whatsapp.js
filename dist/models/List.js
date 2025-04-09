"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListBuilder = void 0;
class ListBuilder {
    constructor(data) {
        Object.assign(this, data);
    }
    /**
     * Sets the title of the list.
     * @param title The title to be set for the list.
     */
    setTitle(title) {
        this.title = title;
    }
    /**
     * Sets the rows of the list.
     * @param rows The rows to be set for the list.
     */
    setRows(rows) {
        this.rows = rows;
    }
}
exports.ListBuilder = ListBuilder;
