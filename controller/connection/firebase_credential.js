const admin = require('firebase-admin');
let serviceAccount = require('./serviceAccountKey');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://flix-10157.firebaseio.com",
    storageBucket: "flix-10157.appspot.com"
});

module.exports = admin;