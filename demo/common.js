// 将 mutationList 显示到页面
function showMutationList(target, data = {}) {
  let el = document.querySelector(target)
  data = data.map(row => {
    let temp = {}
    for (let k in row) {
      if (['addedNodes', 'removedNodes'].includes(k)) {
        temp[k] = []
        row[k].forEach(e => {
          temp[k].push(e.id ? `nodeId: ${e.id}` : `nodeName: ${e.nodeName}`)
        })
      } else if ('target' === k) {
        temp[k] = row[k].id ? `nodeId: ${row[k].id}` : `nodeName: ${row[k].nodeName}`
      } else if (['previousSibling', 'nextSibling'].includes(k)) {
        if (row[k]) {
          temp[k] = row[k].id ? `nodeId: ${row[k].id}` : `nodeName: ${row[k].nodeName}`
        } else {
          temp[k] = `${row[k]}`
        }
      } else {
        temp[k] = `${row[k]}`
      }
    }
    return temp
  })
  el.innerText = JSON.stringify(data, undefined, 2)
}

// 停止观察
function disconnect(target, name) {
  MObserver.disconnect(target, name)
}

// 重新开始观察
function reconnect(target, name) {
  MObserver.reconnect(target, name)
}

// 移除观察
function remove(target, name) {
  MObserver.remove(target, name)
}

function listen(target, event, callback) {
  document.querySelector(target).addEventListener(event, callback, false)
}
