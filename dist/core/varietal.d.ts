import { Selecter } from "../util/dom-query";
import { EachCallback } from "../util/data";
export declare function eobserve(target: Selecter, eachcall: EachCallback, option: MutationObserverInit): void;
export declare function eobserveAll(target: Selecter, eachcall: EachCallback, filter?: string[]): void;
export declare function eattribute(target: Selecter, eachcall: EachCallback, subtree?: boolean): void;
export declare function eattributeFilter(target: Selecter, eachcall: EachCallback, filter: string[], subtree?: boolean): void;
export declare function echildList(target: Selecter, eachcall: EachCallback, subtree?: boolean): void;
export declare function echaracter(target: Selecter, eachcall: EachCallback): void;
