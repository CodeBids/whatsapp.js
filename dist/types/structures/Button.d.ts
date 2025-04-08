export interface Button {
    url?: string;
    reply?: {
        id: string;
        title: string;
    };
    text?: string;
    type?: "reply" | "url";
}
