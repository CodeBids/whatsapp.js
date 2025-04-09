import { Row as RowInterface } from '../types';
export declare class RowBuilder {
    rows: RowInterface[];
    constructor(rows: RowInterface[]);
    addRow(row: RowInterface): RowBuilder;
}
