let currentTabs = {};
let paused = false;

chrome.tabs.onRemoved.addListener((tabId) => {
  removeCompanyFromTabs(currentTabs, tabId)
})

chrome.storage.local.get('paused', function (pausedObj) {
  paused = pausedObj.paused;
});

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    switch (request.type) {
      case 'request-company-details':
        sendResponse(airlineCompanies[request.domain]);
        break;
      case 'remove-company-from-tabs':
        removeCompanyFromTabs(currentTabs, request.id);
        break;
      case 'pause-bws':
        paused = true;
        currentTabs = {};
        break;
      case 'un-pause-bws':
        paused = false;
        break;
      case 'show-modal':
        const tabId = sender.tab.id;
        if (!paused && companyHasGrade(request) && userHasNavigatedToNewSite(tabId, request)) {
          const currentCompanyObj = airlineCompanies[request.domain];
          currentTabs[tabId] = currentCompanyObj;
          if (companyHasBadGrade(currentCompanyObj) && isNotWhitelisted(request, currentCompanyObj)) {
            const modalString = generateModalString(currentCompanyObj);
            sendResponse({ modalString });
          }
          break;
        }
        sendResponse('no-modal');
        break;
      default:
        sendResponse('no-modal');
    }
  })

// Helper Functions

function removeCompanyFromTabs(currentTabsObj, tabIdToDelete) {
  Object.keys(currentTabsObj).forEach(tabId => {
    if (+tabId === tabIdToDelete) {
      delete currentTabs[tabId];
    }
  })
}

function generateModalString(company) {
  $('#grade-letter').text(company.grade)
  $('#grade-statement').text(`${company.brand} has an '${company.grade}' rating from the Better World Shopper Guide.`)

  if (company.grade === 'F') {
    $('#grade-explanation').text(`Only 2% of companies earned an 'F' rating.`)
    $('#grade-box').removeClass('d-box').addClass('f-box')
  } else {
    $('#grade-explanation').text(`Approximately 18% of companies earned a 'D' rating.`)
    $('#grade-box').removeClass('f-box').addClass('d-box')
  }

  return $('#modal-wrapper').html()
}

function userHasNavigatedToNewSite(tabId, request) {
  return !(currentTabs[tabId] && currentTabs[tabId].domain === request.domain)
}

function companyHasGrade(request) {
  return airlineCompanies.hasOwnProperty(request.domain);
}

function companyHasBadGrade(currentCompanyObj) {
  return currentCompanyObj.grade.search(/D|F/) !== -1
}

function isNotWhitelisted(request, currentCompanyObj) {
  return !(request.whitelist && request.whitelist.includes(currentCompanyObj.domain))
}

