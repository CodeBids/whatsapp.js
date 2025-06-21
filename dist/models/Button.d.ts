import { Button as ButtonInterface } from '../types/structures/Button';
export declare class ButtonBuilder implements ButtonInterface {
    type?: 'reply' | 'url';
    id?: string;
    url?: string;
    text?: string;
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
    /**
     * Sets the ID for the button.
     * @param id The unique identifier for the button.
     * */
    setId(id: string): void;
    /**
     * Sets the type of the button.
     * @param type The type of the button, either 'reply' or 'url'.
     * */
    setType(type: 'reply' | 'url'): void;
}
