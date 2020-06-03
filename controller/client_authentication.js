const firebase = require('./connection/firebase_client_auth');

exports.signin = function(request, response) {

  firebase.auth().onAuthStateChanged(function(user) {

    if (user) {
      // User is signed in
      // var email = user.email;
      // console.log('signin');
      return sendData(response,'success');
    } else {
      // console.log('not signin');
      firebase.auth().signInWithEmailAndPassword(request.body.user.email, request.body.user.password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode === 'auth/wrong-password') {
          return sendData(response,'Wrong password');
        } else {
          return sendData(response,'no user');
        }
        // [END_EXCLUDE]
      });
    }
  });

}

function sendData(response,data) {
  response.send(data);
}
