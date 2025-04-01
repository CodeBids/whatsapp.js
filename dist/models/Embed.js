"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Embed = void 0;
class Embed {
    constructor(data) {
        Object.assign(this, data);
    }
    setTitle(text) {
        this.title = text;
    }
    setBody(text) {
        this.body = text;
    }
    setFooter(text) {
        this.footer = text;
    }
}
exports.Embed = Embed;
