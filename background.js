
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

  let currentBrandObj = {};

  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {

      if (request.type === 'request-current-company') {

        sendResponse(airlineCompanies[request.domain]);

      } else if (currentBrandObj.domain === request.domain) {
        sendResponse('no-modal');
      } else if (airlineCompanies.hasOwnProperty(request.domain)) {

        currentBrandObj = airlineCompanies[request.domain]


        if (currentBrandObj.grade.search(/D|F/) !== -1) {

              if (request.whitelist && request.whitelist.includes(currentBrandObj.domain)) {
                sendResponse('no-modal');
              } else {
                $('#grade-letter').text(currentBrandObj.grade)
                $('#grade-statement').text(`${currentBrandObj.brand} has an '${currentBrandObj.grade}' rating from the Better World Shopper Guide.`)

                if (currentBrandObj.grade === 'F') {
                  $('#grade-explanation').text(`Only 2% of companies earned an 'F' rating.`)
                  $('#grade-box').removeClass('d-box').addClass('f-box')
                } else {
                  $('#grade-explanation').text(`Approximately 18% of companies earned a 'D' rating.`)
                  $('#grade-box').removeClass('f-box').addClass('d-box')
                }

                let modalString = $('#modal-wrapper').html()
                sendResponse({modalString});
              }

        } else {
          sendResponse('no-modal');
        }

      } else {
        sendResponse('no-modal');
      }

  });


