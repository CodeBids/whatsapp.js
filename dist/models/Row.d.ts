import { Row as RowInterface } from '../types';
export declare class RowBuiler implements RowInterface {
    id: string;
    title: string;
    description?: string;
    constructor(id: string, title: string, description?: string);
    setId(id: string): RowBuiler;
    setTitle(title: string): RowBuiler;
    setDescription(description: string): RowBuiler;
}
