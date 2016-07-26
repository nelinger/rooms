// The client ID is obtained from the {{ Google Cloud Console }}
// at {{ https://cloud.google.com/console }}.
// If you run this code from a server other than http://localhost,
// you need to register your own client ID.
var OAUTH2_CLIENT_ID = '231044460554-vho75s2q7s5gtna1a9f7jpvlc6m315u0.apps.googleusercontent.com';
var OAUTH2_SCOPES = [
  'https://www.googleapis.com/auth/youtube'
];

$(function() {
  initGoogleApi().then(function() {
    Promise.all([doAuth(), loadYoutubeClient(), loadYoutubePlayer()]).then(function() {
      enableButton();
    });
  });
});

function initGoogleApi() {
  return new Promise(function(resolve) {
    window.googleApiClientReady = function() {
      resolve();
    };
    $.getScript('https://apis.google.com/js/client.js?onload=googleApiClientReady');    
  });
}

function doAuth() {
  return new Promise(function(resolve) {
    var handleAuthResult = function(authResult) {
      if (authResult && !authResult.error) {
        resolve();
      } else {
        // Consent
        gapi.auth.authorize({
          client_id: OAUTH2_CLIENT_ID,
          scope: OAUTH2_SCOPES,
          immediate: false
          }, handleAuthResult);
      }
    };
    var checkAuth = function() {
      gapi.auth.authorize({
        client_id: OAUTH2_CLIENT_ID,
        scope: OAUTH2_SCOPES,
        immediate: true
      }, handleAuthResult);      
    };
    gapi.auth.init(function() {
      window.setTimeout(checkAuth, 1);
    });    
  });
}

function loadYoutubeClient() {
  return new Promise(function(resolve) {
    gapi.client.load('youtube', 'v3', function() {
      resolve();
    });
  });
}

function loadYoutubePlayer() {
  return new Promise(function(resolve) {
    window.onYouTubeIframeAPIReady = function() {
      resolve();
    };
    $.getScript('https://www.youtube.com/iframe_api');
  });
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
  // TODO: verify that all the properties we read are there, otherwise fallback or something
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