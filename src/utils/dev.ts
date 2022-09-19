import { LitElement } from "lit";

export function consoleLitComponent(component: LitElement, msg:any ) {
    console.log(`[${component.tagName}]:`, msg);
}