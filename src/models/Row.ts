import { Row as RowInterface } from '../types';

export class RowBuilder {
  rows: RowInterface[];
  
  constructor(rows: RowInterface[]) {
    this.rows = rows;
  }
  
  addRow(row: RowInterface): RowBuilder {
    this.rows.push(row);
    return this;
  }
}