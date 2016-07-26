function start() {
  var request = gapi.client.plus.people.get({
    'userId': 'me'
  });
  request.execute(function(response) {  	
  	showUserDetails(response)
  });
  enableButton();
}

function showUserDetails(user) {
  $('<div/>', {
    class: 'user'
  }).text('Hello ' + user.displayName).appendTo($('.hello'));
}

function enableButton() {
  $('button').removeAttr('disabled');
}

function createRoom() {	
  // TODO(nelinger): validate the name isn't empty, or better, make the button enabled only when the
  // name is valid.
  console.log('going to create room with name: ' + $('input').val());
}