chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(request)
    console.log($('test'))
    $('#test').text(request.domain)

});

// if (currentBrandObj) {
//   $('#test').text(currentBrandObj.brand)
// } else {
//   $('#test').text('This company does not have a rating')
// }
