import { Component, Embed as EmbedInterface } from '../types';
export declare class EmbedBuilder implements EmbedInterface {
    title: string;
    body: string;
    footer: string;
    components?: Component[] | undefined;
    constructor(data: EmbedInterface);
    setTitle(text: string): void;
    setBody(text: string): void;
    setFooter(text: string): void;
}
