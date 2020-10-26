import { DOMQuery } from "./dom-query";
export declare type EachCallback = (mutations: MutationRecord, observer: MutationObserver) => void;
export interface MCache {
    callback: MutationCallback;
    observer: MutationObserver;
    option: MutationObserverInit;
}
export declare function data(target: DOMQuery, call: MutationCallback | EachCallback, cache?: MCache | null): MCache | undefined;
