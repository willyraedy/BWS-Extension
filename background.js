chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    $('#grade-letter').text(request.target.grade)
    $('#grade-statement').text(`${request.target.brand} has an '${request.target.grade}' rating from the Better World Shopper Guide.`)

    if (request.target.grade === 'F') {
      $('#grade-explanation').text(`Only 2% of companies earned an 'F' rating.`)
      $('#grade-box').removeClass('d-box').addClass('f-box')
    } else {
      $('#grade-explanation').text(`Approximately 18% of companies earned a 'D' rating.`)
      $('#grade-box').removeClass('f-box').addClass('d-box')
    }

    let modalString = $('#modal-wrapper').html()
    let buttonString = $('#button-wrapper').html()
    sendResponse({modalString, buttonString});
  });

