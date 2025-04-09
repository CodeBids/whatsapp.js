import { Row as RowInterface } from '../types';

export class RowBuiler implements RowInterface {
  id: string;
  title: string;
  description?: string;

  constructor(id: string, title: string, description?: string) {
    this.id = id;
    this.title = title;
    this.description = description;
  }

  setId(id: string): RowBuiler {
    this.id = id;
    return this;
  }

  setTitle(title: string): RowBuiler {
    this.title = title;
    return this;
  }

  setDescription(description: string): RowBuiler {
    this.description = description;
    return this;
  }
}