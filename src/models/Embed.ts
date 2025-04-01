import { Component, Embed as EmbedInterface } from '../types'

export class Embed implements EmbedInterface {
  title!: string;
  body!: string;
  footer!: string;
  components?: Component[] | undefined;

  constructor(data: EmbedInterface) {
    Object.assign(this, data)
  }

  setTitle(text: string) {
    this.title = text;
  }

  setBody(text: string) {
    this.body = text;
  }

  setFooter(text: string) {
    this.footer = text;
  }
}