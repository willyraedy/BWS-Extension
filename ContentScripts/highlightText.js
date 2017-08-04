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

  const [grade, color] = setColorAndGrade(companyText);

  textToWrapNode.nodeValue += ` (${grade})`

  const wrapperElement = document.createElement('a');
  wrapperElement.className = 'bws-tooltip';
  const tooltipElement = document.createElement('span');
  tooltipElement.className = 'bws-tooltiptext';
  tooltipElement.innerHTML = `This company was rated a <em>'${grade}'</em> by the Better World Shopping Guide.`;
  wrapperElement.appendChild(tooltipElement);



  wrapperElement.appendChild(textToWrapNode);
  wrapperElement.setAttribute('style', `color:${color}`);
  // wrapperElement.setAttribute('data-toggle', 'tooltip');
  // wrapperElement.setAttribute('id', 'bws-tooltip');
  // wrapperElement.setAttribute('href', 'http://www.betterworldshopper.com/');
  // wrapperElement.setAttribute('target', '_blank');
  // wrapperElement.setAttribute('title', `This company was rated an ${grade} by the Better World Shopping Guide.`);
  node.parentNode.insertBefore(wrapperElement, afterTextNode)
}

function traverseDOM(root) {
  console.log('The root is ', root)
  let queue = [root]
  let headPointer = 0;
  let tailPointer = 1;
  while (tailPointer > headPointer) {
    let node = queue[headPointer];
    let childNode = node.firstChild
    while (childNode) {
      queue[tailPointer] = childNode;
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

// Helper functions

const companyArr = Object.keys(airlineCompanies).map(key => airlineCompanies[key])

function setColorAndGrade(companyBrand) {
  const currentCompany = companyArr.find(compObj => compObj.brand === companyBrand);
  const resultArr = [currentCompany.grade]
  switch (currentCompany.grade) {
     case 'A':
      resultArr.push('#5cb85c');
      break;
    case 'B':
      resultArr.push('#428bca');
      break;
    case 'C':
      resultArr.push('gray');
      break;
    case 'D':
      resultArr.push('#ff9933');
      break;
    case 'F':
      resultArr.push('#ea3b3b');
      break;
    default:
      resultArr.push('gray');
  }
  return resultArr;
}

