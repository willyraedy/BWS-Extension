console.log('Content script run')

function traverseDOMCreator() {
  let count = 0;
  return function(root) {
    if (!root || count > 10) return
    console.log('Function fired')
    count ++;
    let queue = [root]
    while (queue.length) {
      let node = queue[0];
      let childNode = node.firstChild
      while (childNode) {
        console.log(childNode.nodeType)
        queue.push(childNode)
        childNode = childNode.nextSibling
      }
      if (node.nodeType === 3) findString(node)
      queue.shift()
    }
  }
}

const traverseDOM = traverseDOMCreator();

function findString(node, searchString) {
  node.nodeValue = node.nodeValue.replace(/\bUnited\b/g, 'MWAHAHA')
}

setInterval(function() {
    const el = document.getElementById('searchResultsList')
    traverseDOM(el)
  }, 1000)


// document.addEventListener('DOMContentLoaded', function() {
//     const bodyArr = document.getElementsByTagName('body')
//     limitedTraverseFunc(bodyArr[0])
// })
