import type { Row } from "../types";
export declare class RowBuilder {
    private rows;
    constructor(rows?: Row[]);
    addRow(row: Row): RowBuilder;
    build(): Row[];
}
