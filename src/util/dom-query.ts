/**
 * @author fangzhicong
 * @deprecated 封装一个简易的 jQuery
 */

import { MCache, EachCallback } from "./data"

export type Selecter = string | Element | Node | DOMQuery

export class DOMQuery {
    public target: Element | Node

    constructor(selector: Selecter) {
        if (selector instanceof DOMQuery) {
            this.target = selector.target
        } else {
            if (typeof selector === "string") {
                let sel = document.querySelector(selector)
                if (!sel) {
                    throw new Error("无效的节点")
                }
                this.target = sel
            } else {
                this.target = selector
            }
        }
    }

    /**
     * 在 Element/Node 节点上挂载数据
     * @param key 键
     * @param value 值
     */
    public data<T>(key: string, value?: T) {
        if (value !== undefined) {
            Reflect.set(this.target, key, value)
        }
        return Reflect.get(this.target, key)
    }
}

export function $(selecter: Selecter) {
    return new DOMQuery(selecter)
}
