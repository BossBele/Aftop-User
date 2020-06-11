const firebase = require('./connection/firebase_client_auth');
const subscription = require('./subscription')

exports.signin = function(request, response) {
  
  if (request.body.password.isVerified == true) {
    subscription.set_subscription(request.body.password.email,response);
  }
  // firebase.auth().onAuthStateChanged(function(user) {
  //
  //   if (user) {
  //     // User is signed in
  //     // var email = user.email;
  //     //set subscription
  //     subscription.set_subscription(firebase,response);
  //   } else {
  //     // console.log('not signin');
  //     firebase.auth().signInWithEmailAndPassword(request.body.user.email, request.body.user.password).catch(function(error) {
  //       // Handle Errors here.
  //       var errorCode = error.code;
  //       var errorMessage = error.message;
  //       // [START_EXCLUDE]
  //       if (errorCode === 'auth/wrong-password') {
  //         return sendData(response,'Wrong password');
  //       } else {
  //         return sendData(response,'no user');
  //       }
  //       // [END_EXCLUDE]
  //     });
  //   }
  // });

}

exports.signup = function(request, response) {
  firebase.auth().createUserWithEmailAndPassword(request.body.user.email, request.body.user.password)
  .then(function(user) {
    return sendData(response,'user created');
  }).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode === 'auth/email-already-in-use') {
      return sendData(response,'user exists');
    }else {
      return sendData(response,'user error');
    }
  });
}

function sendData(response,data) {
  response.send(data);
}

exports.data_sub = function(response,data){
  return sendData(response,data);
}
