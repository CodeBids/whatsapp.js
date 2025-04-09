import { Row as RowInterface } from '../types';
export declare class RowBuilder implements RowInterface {
    id: string;
    title: string;
    description?: string;
    constructor(id: string, title: string, description?: string);
    setId(id: string): RowBuilder;
    setTitle(title: string): RowBuilder;
    setDescription(description: string): RowBuilder;
}
