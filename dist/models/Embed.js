"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbedBuilder = void 0;
/**
 * Builder class for creating rich embed messages with a title, body, and footer.
 *
 * @example
 * ```ts
 * const embed = new EmbedBuilder({
 *   title: 'Welcome',
 *   body: 'Hello world!',
 *   footer: 'Powered by whatsapp.js'
 * });
 * ```
 */
class EmbedBuilder {
    /**
     * Creates a new EmbedBuilder instance.
     * @param data - The initial embed data.
     */
    constructor(data) {
        Object.assign(this, data);
    }
    /**
     * Sets the title of the embed.
     * @param text - The title text.
     */
    setTitle(text) {
        this.title = text;
    }
    /**
     * Sets the body content of the embed.
     * @param text - The body text.
     */
    setBody(text) {
        this.body = text;
    }
    /**
     * Sets the footer text of the embed.
     * @param text - The footer text.
     */
    setFooter(text) {
        this.footer = text;
    }
}
exports.EmbedBuilder = EmbedBuilder;
