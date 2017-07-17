
function getCompanyName(curURL) {
  let tempArr = curURL.split('.')
  let idx = tempArr.indexOf('www') + 1;
  return tempArr[idx];
}

let domain = getCompanyName(window.location.hostname)

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

// CSS inheriance problems
  // chrome.runtime.sendMessage(messageObj, function(response){

  //   let $modal = $(response.modalString)
  //   let $button = $(response.buttonString)
  //   $(function() {
  //     $('body').append($button)
  //     $('body').append($modal)
  //     $($button).trigger('click.bs.modal.data-api')
  //   })
  // });

  chrome.runtime.sendMessage(messageObj, function(response){

    // let modal = document.createElement('div')
    // modal.innerHTML = response.modalString;

    // const modalButton = document.createElement('div')
    // modalButton.innerHTML = response.buttonString


    document.addEventListener('DOMContentLoaded', function () {
      const bodyArr = document.getElementsByTagName('body')
      const bodyEl = bodyArr[0]

      console.log('Something')

      const hostDiv = document.createElement('div');
      const shadowRoot = hostDiv.attachShadow({ mode: 'open' });
      shadowRoot.innerHTML = `
        <style>
          :host {
            all: initial; /* 1st rule so subsequent properties are reset. */
            display: block;
            background: white;
          }
        </style>
        <!-- Latest compiled and minified CSS -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
        <script
        src="https://code.jquery.com/jquery-3.2.1.min.js"
        integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
        crossorigin="anonymous">
        </script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
        ${response.modalString}
        ${response.buttonString}
        <script>
          var buttonDOMEl = document.querySelector('#test-id')
          $(buttonDOMEl).removeClass('btn-warning')
        </script>
        `;

      bodyEl.appendChild(hostDiv)

      // trigger event
      $('#shadow-root').trigger('click.bs.modal.data-api')

    });

    })
}


