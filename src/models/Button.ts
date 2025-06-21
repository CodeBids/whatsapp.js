import { Button as ButtonInterface } from '../types/structures/Button'

export class ButtonBuilder implements ButtonInterface {
  type?: 'reply' | 'url'
  id?: string
  url?: string
  text?: string

  constructor(data: ButtonInterface) {
      Object.assign(this, data);
    }

  /**
   * Sets the display text for the button.
   * @param displayText The text to be displayed on the button.
   * */
  public setDisplayText(displayText: string): void {
    this.text = displayText;
  }

  /**
   * Sets the URL for the button.
   * @param url The URL to be opened when the button is clicked.
   * */
  public setUrl(url: string): void {
    this.url = url;
  }

  /**
   * Sets the ID for the button.
   * @param id The unique identifier for the button.
   * */
  public setId(id: string): void {
    this.id = id;
  }

  /**
   * Sets the type of the button.
   * @param type The type of the button, either 'reply' or 'url'.
   * */
  public setType(type: 'reply' | 'url'): void {
    this.type = type;
  }
}