import type { Row } from "../types";
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
export declare class RowBuilder {
    private rows;
    /**
     * Creates a new RowBuilder instance.
     * @param rows - Optional initial array of rows.
     */
    constructor(rows?: Row[]);
    /**
     * Adds a row to the builder.
     * @param row - The row to add.
     * @returns The RowBuilder instance for chaining.
     */
    addRow(row: Row): RowBuilder;
    /**
     * Builds and returns the final array of rows.
     * @returns The array of rows.
     */
    build(): Row[];
}
