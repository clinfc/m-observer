/**
 * @author fangzhicong
 * @deprecated 数据缓存
 */

import { DOMQuery } from "./dom-query"

export type EachCallback = (mutations: MutationRecord, observer: MutationObserver) => void

export interface MCache {
    callback: MutationCallback
    observer: MutationObserver
    option: MutationObserverInit
}

const key = "m-observer"

/**
 * 将重要数据挂载到节点对象上
 * @param target 需要被缓存的节点
 * @param call 用户传入的回到函数
 * @param cache 缓存数据
 */
export function data(target: DOMQuery, call: MutationCallback | EachCallback, cache?: MCache | null): MCache | undefined {
    let temp = target.data(key)
    !temp && target.data(key, (temp = new Map()))

    // 设置值
    if (cache) {
        temp.set(call, cache)
        return cache
    }

    const result = temp.get(call)

    if (cache === null) {
        temp.delete(call)
    }

    return result
}
