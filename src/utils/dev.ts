import { LitElement } from "lit";

export function consoleLitComponent(component: LitElement, msg:string) {
    console.log(`[${component.tagName}]: ${msg}`);
}