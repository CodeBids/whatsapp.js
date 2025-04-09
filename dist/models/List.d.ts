import { List as ListInterface } from "../types";
import { Row } from "../types/structures/Row";
export declare class ListBuilder implements ListInterface {
    title: string;
    rows: Row[];
    buttonText: string;
    constructor(data: ListInterface);
    /**
     * Sets the title of the list.
     * @param title The title to be set for the list.
     */
    setTitle(title: string): void;
    /**
     * Sets the rows of the list.
     * @param rows The rows to be set for the list.
     */
    setRows(rows: Row[]): void;
}
