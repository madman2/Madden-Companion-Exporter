var express = require('express');
var admin = require('../firebase/firebase-admin')
var router = express.Router();
var db = admin.database();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Dr. Fugurgal Madden Data' });
});

router.get('/data', function(req, res, next) {
  res.json(db.ref());
});

module.exports = router;
