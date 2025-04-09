import { List as ListInterface } from "../types";
import type { Row } from "../types";
import { RowBuilder } from "../models/Row";
export declare class ListBuilder implements ListInterface {
    title: string;
    rows: Row[];
    buttonText: string;
    constructor(data: {
        title: string;
        rows: Row[] | RowBuilder;
        buttonText: string;
    });
    /**
     * Sets the title of the list.
     * @param title The title to be set for the list.
     */
    setTitle(title: string): ListBuilder;
    /**
     * Sets the rows of the list.
     * @param rows The rows to be set for the list.
     */
    setRows(rows: Row[] | RowBuilder): ListBuilder;
    /**
     * Sets the button text of the list.
     * @param buttonText The button text to be set for the list.
     */
    setButtonText(buttonText: string): ListBuilder;
}
