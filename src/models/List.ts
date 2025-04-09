import { List as ListInterface } from "../types"
import type { Row } from "../types"
import { RowBuilder } from "../models/Row"

export class ListBuilder implements ListInterface {
  title: string
  rows: Row[]
  buttonText: string

  constructor(data: {
    title: string
    rows: Row[] | RowBuilder
    buttonText: string
  }) {
    this.title = data.title

    if (data.rows instanceof RowBuilder) {
      this.rows = data.rows.build()
    } else {
      this.rows = data.rows || []
    }

    this.buttonText = data.buttonText
  }

  /**
   * Sets the title of the list.
   * @param title The title to be set for the list.
   */
  public setTitle(title: string): ListBuilder {
    this.title = title
    return this
  }

  /**
   * Sets the rows of the list.
   * @param rows The rows to be set for the list.
   */
  public setRows(rows: Row[] | RowBuilder): ListBuilder {
    if (rows instanceof RowBuilder) {
      this.rows = rows.build()
    } else {
      this.rows = rows
    }
    return this
  }

  /**
   * Sets the button text of the list.
   * @param buttonText The button text to be set for the list.
   */
  public setButtonText(buttonText: string): ListBuilder {
    this.buttonText = buttonText
    return this
  }
}
