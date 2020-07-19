import 'core-js/modules/es.regexp.to-string';
import 'core-js/modules/web.dom-collections.iterator';

function _classPrivateFieldGet(receiver, privateMap) {
  var descriptor = privateMap.get(receiver);

  if (!descriptor) {
    throw new TypeError("attempted to get private field on non-instance");
  }

  if (descriptor.get) {
    return descriptor.get.call(receiver);
  }

  return descriptor.value;
}

function _classPrivateFieldSet(receiver, privateMap, value) {
  var descriptor = privateMap.get(receiver);

  if (!descriptor) {
    throw new TypeError("attempted to set private field on non-instance");
  }

  if (descriptor.set) {
    descriptor.set.call(receiver, value);
  } else {
    if (!descriptor.writable) {
      throw new TypeError("attempted to set read only private field");
    }

    descriptor.value = value;
  }

  return value;
}

function _classPrivateMethodGet(receiver, privateSet, fn) {
  if (!privateSet.has(receiver)) {
    throw new TypeError("attempted to get private field on non-instance");
  }

  return fn;
}

var _cache = new WeakMap();

var _prefix = new WeakMap();

var _config = new WeakMap();

var _dataset = new WeakMap();

var _observer = new WeakSet();

var _observe = new WeakSet();

/**
 * 对 MutationObserver 的封装，简化其使用方式
 */
class MObserver {
  constructor() {
    _observe.add(this);

    _observer.add(this);

    _dataset.set(this, {
      get: _get_dataset,
      set: void 0
    });

    _config.set(this, {
      get: _get_config,
      set: void 0
    });

    _cache.set(this, {
      writable: true,
      value: void 0
    });

    _prefix.set(this, {
      writable: true,
      value: 'zc'
    });

    _classPrivateFieldSet(this, _cache, new Map());
  }
  /**
   * 获取当前绑定 element 元素的 dataset 属性前缀
   */


  get prefix() {
    return _classPrivateFieldGet(this, _prefix);
  }
  /**
   * 当前绑定 element 元素的 dataset 属性前缀
   */


  set prefix(value) {
    _classPrivateFieldSet(this, _prefix, typeof value === 'string' && value.length ? value : 'zc');
  }
  /**
   * MutationObser 支持的配置项
   * 
   * https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserverInit
   */


  /**
   * 生成唯一字符串
   * 
   * @return {String} 32 位长度字符串
   */
  get uuid() {
    return [Math.random().toString(16).slice(2), new Date().getTime().toString(16), Math.random().toString(16).slice(2)].join('').slice(2, 34);
  }

  /**
   * Element 元素选择器
   * 
   * @param {Element|String} target 
   * @return {Elment}
   */
  selector(target) {
    if (typeof target === 'string') {
      target = document.querySelector(target);
    }

    if (!target || !(target instanceof HTMLElement)) {
      throw new Error('无效的 target！');
    }

    return target;
  }
  /**
   * 获取 HTML 标签绑定的 cacheKey
   * @param {Element|String} target 
   */


  getCacheKey(target) {
    target = this.selector(target);

    let cacheKey = target.dataset[_classPrivateFieldGet(this, _dataset)];

    if (!cacheKey) {
      cacheKey = this.uuid;
      target.dataset[_classPrivateFieldGet(this, _dataset)] = cacheKey;
    }

    return cacheKey;
  }
  /**
   * 鉴定绑定
   * 
   * @param {Element|String} target 需要监听的 Element 元素
   * @param {Function} callback
   * @param {String} name  当前绑定的 MutationObserver 实例名
   * @return {Object} 返回包含有 MutationObserver实例名 和 MutationObserver实例对象
   */


  /**
   * childList，attributes 或者 characterData 三个属性之中，至少有一个必须为 true，否则会抛出 TypeError 异常
   * 
   * @param {String|Element} target 被监听的节点  
   * @param {Function} callback 当观察到变动时执行的回调函数
   * @param {Object} config MutationObserverInit字典配置项
   * @param {String} name MutationObserver 实例的变量名
   * @return {Object} 返回包含有 MutationObserver实例名 和 MutationObserver实例对象
   */
  observe(target, callback) {
    let config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    let name = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
    config = config || {};
    return _classPrivateMethodGet(this, _observe, _observe2).call(this, target, callback, config, name);
  }
  /**
   * 监听所有的 MutationObserverInit 字典属性
   * 
   * @param {String|Element} target 被监听的节点  
   * @param {Function} callback 当观察到变动时执行的回调函数
   * @param {Array} filter 要监视的特定属性名称的数组。如果未包含此属性，则对所有属性的更改都会触发变动通知  
   * @param {String} name MutationObserver 实例的变量名
   * @return {Object} 返回包含有 MutationObserver实例名 和 MutationObserver实例对象
   */


  observeAll(target, callback) {
    let filter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    let name = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

    let config = _classPrivateFieldGet(this, _config);

    if (Array.isArray(filter) && filter.length) {
      config.attributeFilter = filter;
    }

    return _classPrivateMethodGet(this, _observe, _observe2).call(this, target, callback, config, name);
  }
  /**
   * 监听元素的属性值变更
   * 
   * @param {String|Element} target 被监听的节点  
   * @param {Function} callback 当观察到变动时执行的回调函数 
   * @param {String} name MutationObserver 实例的变量名
   * @return {Object} 返回包含有 MutationObserver实例名 和 MutationObserver实例对象
   */


  attribute(target, callback) {
    let name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
    let config = {
      attributes: true,
      attributeOldValue: true
    };
    return _classPrivateMethodGet(this, _observe, _observe2).call(this, target, callback, config, name);
  }
  /**
   * 监听元素及其后代元素的属性值变更
   * 
   * @param {String|Element} target 被监听的节点  
   * @param {Function} callback 当观察到变动时执行的回调函数 
   * @param {String} name MutationObserver 实例的变量名
   * @return {Object} 返回包含有 MutationObserver实例名 和 MutationObserver实例对象
   */


  attributeChild(target, callback) {
    let name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
    let config = {
      subtree: true,
      attributes: true,
      attributeOldValue: true
    };
    return _classPrivateMethodGet(this, _observe, _observe2).call(this, target, callback, config, name);
  }
  /**
   * 监听元素的特定属性名称
   * 
   * @param {String|Element} target 被监听的节点  
   * @param {Function} callback 当观察到变动时执行的回调函数 
   * @param {Array} filter 
   * @param {String} name MutationObserver 实例的变量名
   * @return {Object} 返回包含有 MutationObserver实例名 和 MutationObserver实例对象
   */


  attributeFilter(target, callback, filter, name) {
    let config = {
      attributes: true,
      attributeFilter: filter,
      attributeOldValue: true
    };
    return _classPrivateMethodGet(this, _observe, _observe2).call(this, target, callback, config, name);
  }
  /**
   * 监听元素及其后代元素的特定属性名称
   * 
   * @param {String|Element} target 被监听的节点  
   * @param {Function} callback 当观察到变动时执行的回调函数 
   * @param {String} name MutationObserver 实例的变量名
   * @return {Object} 返回包含有 MutationObserver实例名 和 MutationObserver实例对象
   */


  attributeFilterChild(target, callback, filter, name) {
    let config = {
      subtree: true,
      attributes: true,
      attributeFilter: filter,
      attributeOldValue: true
    };
    return _classPrivateMethodGet(this, _observe, _observe2).call(this, target, callback, config, name);
  }
  /**
   * 监视目标节点的子节点的添加或删除
   * 
   * @param {String|Element} target 被监听的节点  
   * @param {Function} callback 当观察到变动时执行的回调函数 
   * @param {String} name MutationObserver 实例的变量名
   * @return {Object} 返回包含有 MutationObserver实例名 和 MutationObserver实例对象
   */


  node(target, callback) {
    let name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
    return _classPrivateMethodGet(this, _observe, _observe2).call(this, target, callback, {
      childList: true
    }, name);
  }
  /**
   * 监视目标节点的后代节点的添加或删除
   * 
   * @param {String|Element} target 被监听的节点  
   * @param {Function} callback 当观察到变动时执行的回调函数 
   * @param {String} name MutationObserver 实例的变量名
   * @return {Object} 返回包含有 MutationObserver实例名 和 MutationObserver实例对象
   */


  nodeChild(target, callback) {
    let name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
    let config = {
      subtree: true,
      childList: true
    };
    return _classPrivateMethodGet(this, _observe, _observe2).call(this, target, callback, config, name);
  }
  /**
   * 监视指定目标节点或子节点树中节点所包含的字符数据的变化
   * 
   * @param {String|Element} target 被监听的节点  
   * @param {Function} callback 当观察到变动时执行的回调函数 
   * @param {String} name MutationObserver 实例的变量名
   * @return {Object} 返回包含有 MutationObserver实例名 和 MutationObserver实例对象
   */


  character(target, callback) {
    let name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
    let config = {
      subtree: true,
      characterData: true,
      characterDataOldValue: true
    };
    return _classPrivateMethodGet(this, _observe, _observe2).call(this, target, callback, config, name);
  }
  /**
   * 告诉观察者停止观察变动
   * 
   * @param {Element|String} target 被监听的节点 
   * @param {String|null} name MutationObserver 实例名。如果 name 为 null，则停止观察绑定的全部 MutationObserver 实例 
   * @return {Boolean}
   */


  disconnect(target) {
    let name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    let cacheKey = this.getCacheKey(target);

    let mos = _classPrivateFieldGet(this, _cache).get(cacheKey);

    if (mos) {
      if (name === null) {
        Object.values(mos).forEach(mo => {
          mo.disconnect();
        });
        return true;
      }

      if (name && mos[name]) {
        mos[name].disconnect();
        return true;
      }
    }

    return false;
  }
  /**
   * 返回已检测到但尚未由观察者的回调函数处理的所有匹配DOM更改的列表，使变更队列保持为空
   * 
   * @param {Element|String} target  
   * @param {String|null} name MutationObserver 实例名。如果 name 为 null，则停止观察绑定的全部 MutationObserver 实例 
   * @return {Object} 返回一个由 MutationObserver实例名为键 和 MutationRecord对象列表为值 构成的一个对象
   */


  takeRecords(target) {
    let name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    let cacheKey = this.getCacheKey(target);

    let mos = _classPrivateFieldGet(this, _cache).get(cacheKey);

    let temp = {};

    if (mos) {
      if (name === null) {
        for (let mo in mos) {
          temp[mo] = mos[mo].takeRecords();
        }
      }

      if (name && mos[name]) {
        temp[name] = mos[name].takeRecords();
      }
    }

    return temp;
  }

}

var _get_config = function _get_config() {
  return {
    // 设为 true 以观察受监视元素的属性值变更。默认值为 false
    attributes: true,
    // 要监视的特定属性名称的数组。如果未包含此属性，则对所有属性的更改都会触发变动通知。无默认值
    // attributeFilter: [],
    // 当监视节点的属性改动时，将此属性设为 true 将记录任何有改动的属性的上一个值。有关观察属性更改和值记录的详细信息。无默认值
    attributeOldValue: true,
    // 设为 true 以监视目标节点（如果 subtree 为 true，则包含子孙节点）添加或删除新的子节点。默认值为 false
    childList: true,
    // 设为 true 以将监视范围扩展至目标节点整个节点树中的所有节点。MutationObserverInit 的其他值也会作用于此子树下的所有节点，而不仅仅只作用于目标节点。默认值为 false
    subtree: true,
    // 设为 true 以监视指定目标节点或子节点树中节点所包含的字符数据的变化。无默认值
    characterData: true,
    // 设为 true 以在文本在受监视节点上发生更改时记录节点文本的先前值。无默认值
    characterDataOldValue: true
  };
};

var _get_dataset = function _get_dataset() {
  return "".concat(this.prefix, "Mobserver");
};

var _observer2 = function _observer2(target, callback, name) {
  let cacheKey = this.getCacheKey(target);
  let observer = new MutationObserver(callback || function (list) {
    console.log(list);
  });
  let mos = _classPrivateFieldGet(this, _cache).get(cacheKey) || {};
  name = name || this.uuid;
  mos[name] = observer;

  _classPrivateFieldGet(this, _cache).set(cacheKey, mos);

  return {
    name,
    observer
  };
};

var _observe2 = function _observe2(target, callback, config, name) {
  target = this.selector(target);

  let ob = _classPrivateMethodGet(this, _observer, _observer2).call(this, target, callback, name);

  ob.observer.observe(target, config);
  return ob;
};

var index = new MObserver();

export default index;
