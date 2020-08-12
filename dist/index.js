(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('core-js/modules/web.dom-collections.iterator')) :
  typeof define === 'function' && define.amd ? define(['exports', 'core-js/modules/web.dom-collections.iterator'], factory) :
  (global = global || self, factory(global.MObserver = {}));
}(this, (function (exports) { 'use strict';

  // 空函数

  function isFunction(target) {
    return typeof target === 'function';
  } // 类型判断：字符串

  function isString(target) {
    return typeof target === 'string';
  } // 类型判断：Node 节点

  function isNode(target) {
    return target instanceof Node;
  } // 类型判断：Element 元素

  function isElement(target) {
    return target instanceof Element;
  }

  class element {
    constructor(target) {
      if (target instanceof element) {
        this.el = target.el;
      } else if (isString(target)) {
        this.el = document.querySelector(target);
      } else if (isNode(target) || isElement(target)) {
        this.el = target;
      }

      if (!this.el) {
        throw new Error('无效的监听对象！');
      }
    }
    /**
     * 绑定数据
     * @param {any} key 键
     * @param {any} value 值
     */


    data(key) {
      let value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      let dataSource = this.el.dataSource;

      if (!dataSource) {
        dataSource = new Map();
        this.el.dataSource = dataSource;
      }

      if (value !== undefined) {
        dataSource.set(key, value);
        return this;
      }

      return dataSource.get(key);
    }

  }

  function selector(target) {
    return new element(target);
  }

  const observerKey = 'm-observer'; // 初始化缓存器

  function initData(el) {
    let mo = el.data(observerKey); // 初始化

    if (!mo) {
      mo = new Map();
      el.data(observerKey, mo);
    }

    return mo;
  } // 保存数据


  function setData(el, callback, config, observer) {
    let data = initData(el);
    let old = data.get(callback);

    if (old && old.observer) {
      old.observer.disconnect();
    }

    data.set(callback, {
      callback,
      config,
      observer
    });
  } // 获取数据


  function getData(el, callback) {
    let clean = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    let data = initData(el);
    let temp = data.get(callback); // 清理数据

    if (clean) {
      data.delete(callback);
    }

    return temp || {};
  }
  /**
   * childList，attributes 或者 characterData 三个属性之中，至少有一个必须为 true，否则会抛出 TypeError 异常
   * 
   * @param {Element|Node|String} target 被监听的节点  
   * @param {Function} callback 当观察到变动时执行的回调函数
   * @param {Object} config MutationObserverInit字典配置项
   * @return {observer} MutationObserver实例
   */


  function observe(target, callback, config) {
    let el = selector(target);

    if (!isFunction(callback)) {
      throw new Error('无效的观察回到函数！');
    }

    let observer = new MutationObserver(callback);
    observer.observe(el.el, config);
    setData(el, callback, config, observer);
    return observer;
  }
  /**
   * 监听元素的属性值变更
   * 
   * @param {Element|Node|String} target 被监听的节点  
   * @param {Function} callback 当观察到变动时执行的回调函数
   * @param {Boolean} subtree 是否观察子节点
   * @return {observer} MutationObserver实例
   */

  function attribute(target, callback) {
    let subtree = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    let config = {
      subtree: !!subtree,
      attributes: true,
      attributeOldValue: true
    };
    return observe(target, callback, config);
  }
  /**
   * 监听元素的特定属性名称
   * 
   * @param {Element|Node|String} target 被监听的节点
   * @param {Function} callback 当观察到变动时执行的回调函数
   * @param {Array} filter 要监视的特定属性名称的数组。如果未包含此属性，则对所有属性的更改都会触发变动通知
   * @param {Boolean} subtree 是否观察子节点
   * @return {observer} MutationObserver实例
   */

  function attributeFilter(target, callback, filter) {
    let subtree = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    let config = {
      subtree: !!subtree,
      attributes: true,
      attributeFilter: filter,
      attributeOldValue: true
    };
    return observe(target, callback, config);
  }
  /**
   * 监视目标节点的子节点的添加或删除
   * 
   * @param {Element|Node|String} target 被监听的节点 
   * @param {Function} callback 当观察到变动时执行的回调函数
   * @param {Boolean} subtree 是否观察子节点
   * @return {observer} MutationObserver实例
   */

  function childList(target, callback) {
    let subtree = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    let config = {
      subtree: !!subtree,
      childList: true
    };
    return observe(target, callback, config);
  }
  /**
   * 监视指定目标节点或子节点树中节点所包含的字符数据的变化
   * 
   * @param {Element|Node|String} target 被监听的节点
   * @param {Function} callback 当观察到变动时执行的回调函数
   * @return {observer} MutationObserver实例
   */

  function character(target, callback) {
    let config = {
      subtree: true,
      characterData: true,
      characterDataOldValue: true
    };
    return observe(target, callback, config);
  }
  /**
   * 从MutationObserver的通知队列中删除所有待处理的通知，并将它们返回到MutationRecord对象的新Array中
   * 
   * @param {Element|Node|String} target  
   * @param {Function} callback 当观察到变动时执行的回调函数
   * @return {Array}
   */

  function takeRecords(target, callback) {
    let el = selector(target);
    let {
      observer
    } = getData(el, callback);

    if (observer instanceof MutationObserver) {
      return observer.takeRecords();
    }

    return [];
  }
  /**
   * 告诉观察者停止观察变动，返回还未处理的通知
   * 
   * @param {Element|Node|String} target 被监听的节点 
   * @param {Function} callback 当观察到变动时执行的回调函数
   * @return {Array}
   */

  function disconnect(target, callback) {
    let el = selector(target);
    let {
      observer
    } = getData(el, callback);
    let temp = [];

    if (observer) {
      temp = observer.takeRecords();
      observer.disconnect();
    }

    return temp;
  }
  /**
   * 告诉观察者重新开始观察行为
   * 
   * @param {Element|Node|String} target 被监听的节点 
   * @param {Function} callback 当观察到变动时执行的回调函数
   * @return {observer} MutationObserver实例
   */

  function reconnect(target, callback) {
    let el = selector(target);
    let {
      observer,
      config
    } = getData(el, callback);

    if (!(observer instanceof MutationObserver)) {
      throw new Error('该监听器不存在（未定义或已被移除）！');
    }

    observer.observe(el.el, config);
    return observer;
  }
  /**
   * 移除观察者，返回还未处理的通知
   * 
   * @param {Element|Node|String} target 被监听的节点 
   * @param {Function} callback 当观察到变动时执行的回调函数
   * @return {Array}
   */

  function remove(target, callback) {
    let el = selector(target);
    let {
      observer
    } = getData(el, callback, true);

    if (observer instanceof MutationObserver) {
      let temp = observer.takeRecords();
      observer.disconnect();
      return temp;
    }

    return [];
  }

  exports.attribute = attribute;
  exports.attributeFilter = attributeFilter;
  exports.character = character;
  exports.childList = childList;
  exports.disconnect = disconnect;
  exports.observe = observe;
  exports.reconnect = reconnect;
  exports.remove = remove;
  exports.takeRecords = takeRecords;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=index.js.map
