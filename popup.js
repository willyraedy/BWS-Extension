chrome.runtime.sendMessage('request-current-company', function(response){
  const currentCompany = response;
  if (currentCompany) {
    $('#grade-statement').text(`${currentCompany.brand} has an ${currentCompany.grade} rating`);

    switch (currentCompany.grade) {

      case 'A':
        $('#grade-explanation').text('insert grade A expl')
        break;
      case 'B':
        $('#grade-explanation').text('insert grade B expl')
        break;
      case 'C':
        $('#grade-explanation').text('insert grade C expl')
        break;
      case 'D':
        $('#grade-explanation').text('insert grade D expl')
        break;
      case 'E':
        $('#grade-explanation').text('insert grade E expl')
        break;
      default:
        return;

    }

  }
});
