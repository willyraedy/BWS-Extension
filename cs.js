
function getCompanyName(curURL) {
  let tempArr = curURL.split('.')
  let idx = tempArr.indexOf('www') + 1;
  return tempArr[idx];
}

console.log(window.location)

let domain = getCompanyName(window.location.hostname)

console.log(domain)

// hardcoded obj
let airlineCompanies = {
  id: 'dev',
  southwest: {
     brand: 'Southwest',
     grade: 'B',
     override: false,
     known: false,
     domain: 'southwest' },
  jetblue: {
     brand: 'JetBlue',
     grade: 'B',
     override: false,
     known: false,
     domain: 'jetblue' },
  delta: {
     brand: 'Delta',
     grade: 'D',
     override: false,
     known: false,
     domain: 'delta' },
  united: {
     brand: 'United',
     grade: 'F',
     override: false,
     known: false,
     domain: 'united' },
  aa: {
     brand: 'American Airlines',
     grade: 'F',
     override: false,
     known: false,
     domain: 'aa' },
  flyfrontier: {
     brand: 'Frontier',
     grade: 'B',
     override: false,
     known: false,
     domain: 'flyfrontier' },
  virginamerica: {
     brand: 'Virgin',
     grade: 'B',
     override: false,
     known: false,
     domain: 'virginamerica' },
  spirit: {
     brand: 'Spirit',
     grade: 'C',
     override: false,
     known: false,
     domain: 'spirit' },
  alaskaair: {
    brand: 'Alaskan Airlines',
    grade: 'B',
    override: false,
    known: false,
    domain: 'alaskaair' },
  britishairways: {
    brand: 'British Airways',
    grade: 'C',
    override: false,
    known: false,
    domain: 'britishairways' },
  easyjet: {
    brand: 'Easy Jet',
    grade: 'C',
    override: false,
    known: false,
    domain: 'easyjet' }
  }

if (airlineCompanies.hasOwnProperty(domain) && airlineCompanies[domain].grade.search(/D|F/) !== -1) {

  const messageObj = {
    target: airlineCompanies[domain],
    airlineCompanies: airlineCompanies
  }

  chrome.runtime.sendMessage(messageObj, function(response){

    let $modal = $(response.modalString)
    let $button = $(response.buttonString)
    $(function() {
      $('body').append($button)
      $('body').append($modal)
      $($button).trigger('click.bs.modal.data-api')
    })
  });
}


