// The client ID is obtained from the {{ Google Cloud Console }}
// at {{ https://cloud.google.com/console }}.
// If you run this code from a server other than http://localhost,
// you need to register your own client ID.
var OAUTH2_CLIENT_ID = '231044460554-vho75s2q7s5gtna1a9f7jpvlc6m315u0.apps.googleusercontent.com';
var OAUTH2_SCOPES = [
  'https://www.googleapis.com/auth/youtube'
];

// Upon loading, the Google APIs JS client automatically invokes this callback.
googleApiClientReady = function() {
  gapi.auth.init(function() {
    window.setTimeout(checkAuth, 1);
  });
}

// Attempt the immediate OAuth 2.0 client flow as soon as the page loads.
// If the currently logged-in Google Account has previously authorized
// the client specified as the OAUTH2_CLIENT_ID, then the authorization
// succeeds with no user intervention. Otherwise, it fails and the
// user interface that prompts for authorization needs to display.
function checkAuth() {
  gapi.auth.authorize({
    client_id: OAUTH2_CLIENT_ID,
    scope: OAUTH2_SCOPES,
    immediate: true
  }, handleAuthResult);
}

// Handle the result of a gapi.auth.authorize() call.
function handleAuthResult(authResult) {
  if (authResult && !authResult.error) {
    loadAPIClientInterfaces();
  } else {
    // Consent
    gapi.auth.authorize({
      client_id: OAUTH2_CLIENT_ID,
      scope: OAUTH2_SCOPES,
      immediate: false
      }, handleAuthResult);
  }
}

// Load the client interfaces for the YouTube Analytics and Data APIs, which
// are required to use the Google APIs JS client. More info is available at
// https://developers.google.com/api-client-library/javascript/dev/dev_jscript#loading-the-client-library-and-the-api
function loadAPIClientInterfaces() {
  gapi.client.load('youtube', 'v3', function() {
    search();
  });
}

function search() {
  var request = gapi.client.youtube.search.list({
    q: 'Kendrik Lamar',
    part: 'snippet'
  });
  request.execute(function(response) {
    console.info('Got results from YouTube:', response.result);
  });
}