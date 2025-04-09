"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RowBuilder = void 0;
class RowBuilder {
    constructor(rows) {
        this.rows = rows;
    }
    addRow(row) {
        this.rows.push(row);
        return this;
    }
}
exports.RowBuilder = RowBuilder;
