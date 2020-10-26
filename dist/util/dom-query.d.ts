export declare type Selecter = string | Element | Node | DOMQuery;
export declare class DOMQuery {
    target: Element | Node;
    constructor(selector: Selecter);
    data<T>(key: string, value?: T): any;
}
export declare function $(selecter: Selecter): DOMQuery;
