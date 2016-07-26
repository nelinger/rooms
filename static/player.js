function start() {
  enableButton();
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
  alert('player state changed: ' + event.data);
}