import { Component, Embed as EmbedInterface } from '../types';
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
export declare class EmbedBuilder implements EmbedInterface {
    title: string;
    body: string;
    footer: string;
    components?: Component[] | undefined;
    /**
     * Creates a new EmbedBuilder instance.
     * @param data - The initial embed data.
     */
    constructor(data: EmbedInterface);
    /**
     * Sets the title of the embed.
     * @param text - The title text.
     */
    setTitle(text: string): void;
    /**
     * Sets the body content of the embed.
     * @param text - The body text.
     */
    setBody(text: string): void;
    /**
     * Sets the footer text of the embed.
     * @param text - The footer text.
     */
    setFooter(text: string): void;
}
