var express = require('express');
var admin = require('../firebase/firebase-admin')
var router = express.Router();

var db = admin.database();
var ref = db.ref("data/xbox/1494801/leagueteams/leagueTeamInfoList");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Dr. Fugurgal Madden Data' });
});

router.get('/data', function(req, res, next) {
  ref.once("value", function(snapshot) {
    res.json(snapshot);
  });
});

module.exports = router;
