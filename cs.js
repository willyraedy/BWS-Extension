
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

  chrome.runtime.sendMessage(messageObj, function(response){

    document.addEventListener('DOMContentLoaded', function () {
      const bodyArr = document.getElementsByTagName('body');
      const bodyEl = bodyArr[0];

      const hostDiv = document.createElement('div');
      hostDiv.setAttribute("style", "all:initial");
      const shadowRoot = hostDiv.attachShadow({ mode: 'open' });

      shadowRoot.innerHTML = `
        <!-- Latest compiled and minified CSS -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">



        <style>

          .f-box {
            background-color: #ea3b3b;
            border-radius: 20px;
          }

          .d-box {
            background-color: #ff9933;
            border-radius: 20px;
          }

          #grade-letter {
            font-size: 100px;
            font-family: Arial, Helvetica, sans-serif;
            font-weight: bold;
            line-height: 120px;
            color: white;
            margin: 0 }

          .label {
            text-align: center; }

          .modal-body span {
            display: table;
            margin: 0 auto; }

          .modal-body ul {
            list-style: none;
            text-align: center;
            padding: 0; }

          .modal-body h4 {
            margin-bottom: 25px; }

          .modal-body button {
            text-align: center;
            display: inline; }

          .modal-dialog hr {
            margin: 5px 0 0 15px; }

          .show-more {
            color: gray; }

          .modal-dialog p {
            color: black;
            font-size: 15px;
          }

          .modal-dialog h3 {
            color: black;
            font-size: 25px;
            line-height: 35px;
            font-weight: bold;
            padding: 20px;
            margin: 0;
          }

          .modal-dialog h4 {
            color: black;
            font-size: 20px;

          }

          #my-modal-dialog {
            background-color: transparent;
          }

          .modal-dialog span {
            font-size: 14px;
          }
          .modal-dialog a {
            font-size: 14px;
          }

          .modal-dialog * {
            font-family: Arial, Helvetica, sans-serif;
          }

          #a-rated-co, #b-rated-co, #c-rated-co {
            margin: 0;
          }

        </style>
        <div>
          ${response.modalString}
        </div>
        `;

      // Can't get collapse to work; suspect js inside modal not working

      //  const shadowJQueryUIScript = document.createElement('script');
      //  shadowJQueryUIScript.setAttribute('src', 'https://code.jquery.com/ui/1.12.1/jquery-ui.js')
      //  shadowJQueryUIScript.setAttribute('integrity', 'sha256-T0Vest3yCU7pafRw9r+settMBX6JkKN06dqBnpQ8d30=')
      //  shadowJQueryUIScript.setAttribute('crossorigin', 'anonymous')
      //  shadowRoot.appendChild(shadowJQueryUIScript);

      //  const shadowJQueryScript = document.createElement('script');
      //  shadowJQueryScript.setAttribute('src', 'https://code.jquery.com/jquery-3.2.1.js')
      //  shadowJQueryScript.setAttribute('integrity', 'sha256-DZAnKJ/6XZ9si04Hgrsxu/8s717jcIzLy3oi35EouyE=')
      //  shadowJQueryScript.setAttribute('crossorigin', 'anonymous')
      //  shadowRoot.appendChild(shadowJQueryScript);

      // const shadowBootstrapScript = document.createElement('script');
      // shadowBootstrapScript.setAttribute('src', 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js')
      // shadowBootstrapScript.setAttribute('integrity', 'sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa')
      // shadowBootstrapScript.setAttribute('crossorigin', 'anonymous')
      // shadowRoot.appendChild(shadowBootstrapScript);

      const testScript = document.createElement('script');
      testScript.text = 'console.log("Please be visible")';
      shadowRoot.appendChild(testScript);

      bodyEl.appendChild(hostDiv);

      const modalInShadow = shadowRoot.querySelector('#bws-modal')
      $(modalInShadow).modal('show').css({display: 'block'})

    });

    })
}

