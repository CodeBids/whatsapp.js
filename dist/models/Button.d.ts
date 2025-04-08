import { Button as ButtonInterface } from '../types/structures/Button';
export declare class ButtonBuilder implements ButtonInterface {
    url?: string;
    reply?: {
        id: string;
        title: string;
    };
    text?: string;
    type?: 'reply' | 'url';
    constructor(data: ButtonInterface);
    /**
     * Sets the display text for the button.
     * @param displayText The text to be displayed on the button.
     * */
    setDisplayText(displayText: string): void;
    /**
     * Sets the URL for the button.
     * @param url The URL to be opened when the button is clicked.
     * */
    setUrl(url: string): void;
}
