import type { Row } from "../types"

export class RowBuilder {
  private rows: Row[]

  constructor(rows: Row[] = []) {
    this.rows = [...rows]
  }

  addRow(row: Row): RowBuilder {
    this.rows.push(row)
    return this
  }

  build(): Row[] {
    return this.rows
  }
}
