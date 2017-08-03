let currentCompany

// ******
// Helper Functions

function getCompanyName(curURL) {
  let tempArr = curURL.split('.')
  let idx = tempArr.findIndex(string => string.includes('www')) + 1;
  return tempArr[idx];
}

function removeCompanyFromWhitelist(whitelistArr, domain) {
  const removalIndex = whitelistArr.findIndex(company => company === domain);
  const newWhitelist = whitelistArr.slice(0, removalIndex).concat(whitelistArr.slice(removalIndex + 1));
  return newWhitelist;
}

// ******

chrome.storage.local.get('whitelist', function (whitelistedObj) {
  const whitelist = whitelistedObj.whitelist ? whitelistedObj.whitelist : [];
chrome.storage.local.get('paused', function (pausedObj) {
  const paused = pausedObj.paused;
chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, function (tabs) {
  const domain = getCompanyName(tabs[0].url)
  const tabId = tabs[0].id;

  chrome.runtime.sendMessage({type: 'request-company-details', domain}, function(response){

    currentCompany = response;

    if (currentCompany && !paused) {

      $('#pause-btn').on('click', function () {
        chrome.storage.local.set({ paused: true }, function () {
          window.close();
        })
        chrome.runtime.sendMessage({type: 'pause-bws'}, function(response){
          // error handling???
        })
      })

      if (!whitelist.includes(currentCompany.domain)) {

        $('#whitelist').on('click', function () {
          chrome.storage.local.get({ whitelist: [] }, function (result) {
            var whitelistedComps = result.whitelist;
            if (!whitelistedComps.includes(currentCompany.domain)) whitelistedComps.push(currentCompany.domain);

            chrome.storage.local.set({ whitelist: whitelistedComps }, function () {
              window.close();
            });
          });
        })
      } else {
        $('#whitelist').text(`Reactivate modals on ${domain}.com`);
        $('#whitelist').on('click', function () {
          chrome.storage.local.get('whitelist', function (result) {
            var whitelistedComps = removeCompanyFromWhitelist(result.whitelist, domain);

            chrome.storage.local.set({ whitelist: whitelistedComps }, function () {
              window.close();
            });
          });
          chrome.runtime.sendMessage({ type: 'remove-company-from-tabs', id: tabId }, function(response){
            // error handling???
          })
        })
      }

      $('#grade-statement').text(`${currentCompany.brand} has an ${currentCompany.grade} rating`);

      switch (currentCompany.grade) {

        case 'A':
          $('#grade-explanation').text('Companies in the \'A\' range are leaders in the areas of social and environmental responsibiity. Their efforts lay the groundworks for the future of sustainable business worldwide. Often these companies were created specifically to provide socially and environmentally responsible options for consumrs. While none of these companies are perfect, these are about as close as we can get at this stage in our evolving marketplace. Consider going out of your way to support these companies as their efforts are essential to bringing along all of the rest of the companies.')
          $('#bad-grade-options').hide();
          break;
        case 'B':
          $('#grade-explanation').text('Companies that fall into the \'B\' range tend to represent mainstream companies that are making significant progress in turing toward people/planet friendly behaviors. Most large companies peak in this range if they are making a concerted effort to be more responsible. While these compnaies still have a long way to go, their effort should be recognized as they provide a solid alternative to many of their competitors in the same industry.')
          $('#bad-grade-options').hide();
          break;
        case 'C':
          $('#grade-explanation').text('Companies that fall into the \'C\' range either have mixed responsibility records or little or no data exist to rank them relative to the other companies. If you have no data about a particular brand or company, you should almost always assume they fall into this category. Until companies are required to release verifiable data on their social and environmentally relevant behavior, most will end up as C companies. While they are not typically companies worth going out of your way to support, these companies provide us with options when the alternatives are D and F ranked businesses.')
          $('#bad-grade-options').hide();
          break;
        case 'D':
          $('#grade-explanation').text('If a company ends up in the \'D\' range, it is likely engaged in practices that have measurably negative consequences for humans and the environment. Typically these company\'s unsustainable behavior is being tracked by a number of independent, third-parties around more than one issue. It is important to hold these companies accountable for their behavior and to clearly communicat that their practices need to be changed if they are going to earn back the trust of concerned citizens and ethical consumers. You should consider avoiding these companies and brands when possible in order to send this economic message in a way that will be heard.')
          break;
        case 'F':
          $('#grade-explanation').text('The \'F\' category is reserved for companies that are, according to a number of independent, third-party organizations, knowingly engaged in the destruction of the environment and/or exploitation of human beings for the purpose of increasing profits. A significant amount of data is available demonstrating that these businesses are succeeding at the expense of the natural world, other people, and future generations. Many of these companies are some of the largest and most recognizable on the planet, and they are examples of some of the most problematic behaviors in their industries, often pulling other companies in a similarly unsustainable direction in order to keep up with their ability to generate profits.')
          break;
        default:
          $('#grade-explanation').text('Grade not recognized.')

      }


    } else if (paused) {
      $('#grade-statement').text('Better World Shopping Guide is paused')
      $('#bad-grade-options').hide();
      $('#pause-btn').text('Un-pause Better World Shopping Guide')
      $('#pause-btn').on('click', function () {
        chrome.storage.local.set({ paused: false }, function () {
          window.close();
        })
        chrome.runtime.sendMessage({type: 'un-pause-bws'}, function(response){
          // error handling???
        })
      })
    } else {
      $('#bad-grade-options').hide();
    }
  });

});
});
});
