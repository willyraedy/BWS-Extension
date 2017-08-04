const nameArr = Object.keys(airlineCompanies).map(key => airlineCompanies[key].brand)
const nameRegexString = "/" + nameArr.join("|") + "/";
const regex = new RegExp(nameRegexString);

function findString(node, searchString) {
  const match = regex.exec(node.nodeValue)
  if (!match) return;
  const firstIdx = match.index;
  const companyText = match[0];
  const lastIdx = firstIdx + companyText.length;

  const afterTextNode = node.splitText(lastIdx)
  const textToWrapNode = node.splitText(firstIdx)

  const color = '#ea3b3b';

  const underlineEl = document.createElement('u');
  underlineEl.appendChild(textToWrapNode);
  underlineEl.setAttribute('style', `color:${color}`);
  node.parentNode.insertBefore(underlineEl, afterTextNode)
}

function traverseDOM(root) {
  console.log('The root is ', root)
  let queue = [root]
  let headPointer = 0;
  let tailPointer = 0;
  while (tailPointer >= headPointer) {
    let node = queue[headPointer];
    let childNode = node.firstChild
    while (childNode) {
      queue.push(childNode)
      tailPointer++;
      childNode = childNode.nextSibling
    }
    if (node.nodeType === 3) findString(node)
    headPointer++;
  }
  console.log(queue.length);
  queue = null;
}

// set node closest to the results based on website
const targetId = 'searchResultsList'

document.addEventListener('DOMContentLoaded', function () {

  let target = null;

  while (!target) {
    target = document.getElementById(targetId)
  }

  var observer = new MutationObserver(function (mutations) {
    traverseDOM(target)
  });

  // configuration of the observer:
  var config = { attributes: true, childList: true, characterData: true };

  // pass in the target node, as well as the observer options
  if (target) observer.observe(target, config);

});
