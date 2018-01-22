const admin = require('firebase-admin');

const serviceAccount = require("../credentials/maddendb-md326-firebase-adminsdk-g7ubk-c4ae1ace9a.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://maddendb-md326.firebaseio.com/"
});

console.log('Firebase Admin Initialized');

module.exports = admin;