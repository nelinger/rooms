function start() {
  enableButton();
  greetUser();
}

function enableButton() {
  $('button').removeAttr('disabled');
}

function getQueryValue() {
  return $('input').val();
}

function search() {
  var request = gapi.client.youtube.search.list({
    q: getQueryValue(),
    part: 'snippet',
    type: 'video',
    maxResults: 10,
    videoEmbeddable: 'true'
  });
  request.execute(function(response) {
    handleSearchResponse(response.result);
  });
}

function getPosterFor(item) {
  // TODO(nelinger): verify that all the properties we read are there, otherwise fallback or 
  // something.
  return jQuery('<div/>', {
    class: 'poster',
    title: item.snippet.title
  }).css({
    'width': item.snippet.thumbnails.default.width,
    'height': item.snippet.thumbnails.default.height,
    'background-image': 'url(' + item.snippet.thumbnails.default.url + ')'
  }).click(function() {
    play(item);
  });
}

function handleSearchResponse(result) {
  var resultsContainer = $('.resultsContainer');
  resultsContainer.empty();
  result.items.forEach(function(item) {
    resultsContainer.append(getPosterFor(item));
  });
}

function play(item) {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: item.id.videoId,
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });  
}

function onPlayerReady() {
  player.playVideo();
}

function onPlayerStateChange(event) {
  // event.data is oneof YT.PlayerState enum.
  console.log('player state changed: ' + event.data);
}

function greetUser() {
  var request = gapi.client.plus.people.get({
    'userId': 'me'
  });
  request.execute(function(response) {    
    showUserDetails(response)
  });  
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