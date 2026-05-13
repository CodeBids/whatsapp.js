"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RowBuilder = void 0;
/**
 * Builder class for constructing an array of rows for interactive list messages.
 *
 * @example
 * ```ts
 * const rows = new RowBuilder()
 *   .addRow({ id: '1', title: 'Option A' })
 *   .addRow({ id: '2', title: 'Option B' })
 *   .build();
 * ```
 */
class RowBuilder {
    /**
     * Creates a new RowBuilder instance.
     * @param rows - Optional initial array of rows.
     */
    constructor(rows = []) {
        this.rows = [...rows];
    }
    /**
     * Adds a row to the builder.
     * @param row - The row to add.
     * @returns The RowBuilder instance for chaining.
     */
    addRow(row) {
        this.rows.push(row);
        return this;
    }
    /**
     * Builds and returns the final array of rows.
     * @returns The array of rows.
     */
    build() {
        return this.rows;
    }
}
exports.RowBuilder = RowBuilder;
