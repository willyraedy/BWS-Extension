let domain = getCompanyName(window.location.hostname)

chrome.storage.local.get('whitelist', function (whitelistedObj) {

  chrome.runtime.sendMessage({type: 'show-modal', domain, whitelist: whitelistedObj.whitelist}, function(response){
    if (response === 'no-modal') return;
    document.addEventListener('DOMContentLoaded', function () {
      const bodyArr = document.getElementsByTagName('body');
      const bodyEl = bodyArr[0];

      const hostDiv = document.createElement('div');
      const shadowRoot = hostDiv.attachShadow({ mode: 'open' });

      shadowRoot.innerHTML = `
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
        <style>
          ${styleString}
        </style>
        <div>
          ${response.modalString}
        </div>
        `;

      bodyEl.appendChild(hostDiv);

      const modalInShadow = shadowRoot.querySelector('#bws-modal')
      $(modalInShadow).modal('show').css({display: 'block'})

    });

  })

});

// Helper Functions

function getCompanyName(curURL) {
  let tempArr = curURL.split('.')
  let idx = tempArr.indexOf('www') + 1;
  return tempArr[idx];
}
