import { Component } from "../message";
export interface Embed {
    title: string;
    body: string;
    footer: string;
    components?: Component[];
}
