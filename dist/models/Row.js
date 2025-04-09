"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RowBuilder = void 0;
class RowBuilder {
    constructor(id, title, description) {
        this.id = id;
        this.title = title;
        this.description = description;
    }
    setId(id) {
        this.id = id;
        return this;
    }
    setTitle(title) {
        this.title = title;
        return this;
    }
    setDescription(description) {
        this.description = description;
        return this;
    }
}
exports.RowBuilder = RowBuilder;
