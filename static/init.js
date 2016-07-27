// The client ID is obtained from the Google Cloud Console.
var OAUTH2_CLIENT_ID = '231044460554-vho75s2q7s5gtna1a9f7jpvlc6m315u0.apps.googleusercontent.com';
var OAUTH2_SCOPES = [
  'https://www.googleapis.com/auth/youtube',
  'https://www.googleapis.com/auth/plus.login'
];

$(function() {
  initGoogleApi().then(function() {
    authorizeRealtime();
    Promise.all([doAuth(), loadYoutubeClient(), loadPlusClient(), loadYoutubePlayer()]).then(
      function() {        
        start();
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

function loadPlusClient() {
  return new Promise(function(resolve) {
    gapi.client.load('plus', 'v1', function() {
      resolve();
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