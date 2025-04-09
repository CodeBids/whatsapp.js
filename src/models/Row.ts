import { Row as RowInterface } from '../types';

export class RowBuilder implements RowInterface {
  id: string;
  title: string;
  description?: string;

  constructor(id: string, title: string, description?: string) {
    this.id = id;
    this.title = title;
    this.description = description;
  }

  setId(id: string): RowBuilder {
    this.id = id;
    return this;
  }

  setTitle(title: string): RowBuilder {
    this.title = title;
    return this;
  }

  setDescription(description: string): RowBuilder {
    this.description = description;
    return this;
  }
}