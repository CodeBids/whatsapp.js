import { Button as ButtonInterface } from '../types/structures/Button'

export class ButtonBuilder implements ButtonInterface {
  url?: string
  reply?: {
    id: string
    title: string
  }
  text?: string
  type?: 'reply' | 'url'

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
}