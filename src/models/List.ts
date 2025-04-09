import { List as ListInterface } from "../types";
import { Row } from "../types/structures/Row";

export class ListBuilder implements ListInterface {
  title!: string;
  rows!: Row[];

  constructor(data: ListInterface) {
    Object.assign(this, data);
  }

  /**
   * Sets the title of the list.
   * @param title The title to be set for the list.
   */
  public setTitle(title: string): void {
    this.title = title;
  }

  /**
   * Sets the rows of the list.
   * @param rows The rows to be set for the list.
   */
  public setRows(rows: Row[]): void {
    this.rows = rows;
  }
}
