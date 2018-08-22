var express = require('express');
var admin = require('../firebase/firebase-admin')
var router = express.Router();

var db = admin.database();
var leagueTeamsRef = db.ref("data/xbox/1123033/leagueteams/leagueTeamInfoList");
var freeAgentsRef = db.ref("data/xbox/1123033/freeagents/rosterInfoList");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Dr. Fugurgal Madden Data' });
});

router.get('/leagueteams', function(req, res, next) {
  leagueTeamsRef.once("value", function(snapshot) {
    res.json(snapshot);
  });
});

router.get('/freeagents', function(req, res, next) {
  freeAgentsRef.once("value", function(snapshot) {
    res.json(snapshot);
  });
});

module.exports = router;
