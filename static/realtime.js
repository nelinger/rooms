var clientId = '231044460554-vho75s2q7s5gtna1a9f7jpvlc6m315u0.apps.googleusercontent.com';
var realtimeUtils = new utils.RealtimeUtils({ clientId: clientId });

function authorizeRealtime() {
  // Attempt to authorize
  realtimeUtils.authorize(function(response){
    if(response.error){
      // Authorization failed because this is the first time the user has used the app.
      // Prompt to authorize manually.
      realtimeUtils.authorize(function(response){
        startRealtime();
      }, true);
    } else {
        startRealtime();
    }
  }, false);
}

function startRealtime() {
  // With auth taken care of, load a file, or create one if there
  // is not an id in the URL.
  var id = realtimeUtils.getParam('id');
  if (id) {
    // Load the document id from the URL
    realtimeUtils.load(id.replace('/', ''), onFileLoaded, onFileInitialize);
  } else {
    // Create a new document, add it to the URL
    realtimeUtils.createRealtimeFile('New QuickstartRealtime File', function(createResponse) {
      // Set permissions for anyone to be a writer.
      var request = gapi.client.drive.permissions.insert({
        'fileId': createResponse.id,
        'resource': {          
          'type': 'anyone',
          'role': 'writer'
        }
      });
      request.execute(function(resp) { 
        window.history.pushState(null, null, '?id=' + createResponse.id);
        realtimeUtils.load(createResponse.id, onFileLoaded, onFileInitialize);
      });
    });
  }
}

// The first time a file is opened, it must be initialized with the
// document structure.
function onFileInitialize(model) {
  var activities = model.createList();
  model.getRoot().set('activities', activities);
}

function collab() {
  var activities = model.getRoot().get('activities');
  activities.push('Button was clicked at ' + new Date());
}

function onFileLoaded(doc) {
  $('button.collaborate').removeAttr('disabled');
  window.model = doc.getModel();       
  // startRealtime listen to events on the activities list, whenever an event happens, print it.
  var activities = model.getRoot().get('activities');
  activities.addEventListener(gapi.drive.realtime.EventType.VALUES_ADDED, onActivityAdded);
}

function onActivityAdded(event) {
  console.log(event.values);
}""