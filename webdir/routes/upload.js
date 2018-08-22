var express = require('express');
var admin = require('../firebase/firebase-admin')
var router = express.Router();

router.post('/:platform/:leagueId/leagueteams', (req, res) => {
    const db = admin.database();
    const ref = db.ref();
    const {platform, leagueId} = req.params;
    const dataRef = ref.child(`data/${platform}/${leagueId}/leagueteams`);
    const {body: {leagueTeamInfoList}} = req;
  
    dataRef.set({
      leagueTeamInfoList
    });
    res.sendStatus(200);
  });
  
router.post('/:platform/:leagueId/standings', (req, res) => {
  const db = admin.database();
  const ref = db.ref();
  const {platform, leagueId} = req.params;
  const dataRef = ref.child(`data/${platform}/${leagueId}/standings`);
  const {body: {teamStandingInfoList}} = req;

  dataRef.set({
    teamStandingInfoList
  });
  res.sendStatus(200);
});

router.post('/:platform/:leagueId/week/:weekType/:weekNumber/:dataType', (req, res) => {
  const db = admin.database();
  const ref = db.ref();
  const {platform, leagueId, weekType, weekNumber, dataType} = req.params;
  const dataRef = ref.child(`data/${platform}/${leagueId}/week/${weekType}/${weekNumber}/${dataType}`);

  // method=POST path="/platform/leagueId/week/reg/1/defense"
  // method=POST path="/platform/leagueId/week/reg/1/kicking"
  // method=POST path="/platform/leagueId/week/reg/1/passing"
  // method=POST path="/platform/leagueId/week/reg/1/punting"
  // method=POST path="/platform/leagueId/week/reg/1/receiving"
  // method=POST path="/platform/leagueId/week/reg/1/rushing"

  switch(dataType) {
    case 'schedules':
      const {body: {gameScheduleInfoList}} = req;
      dataRef.set({
        gameScheduleInfoList
      });
      break;
    case 'teamstats':
      const {body: {teamStatInfoList}} = req;
      dataRef.set({
        teamStatInfoList
      });
      break;
    case 'defense':
      const {body: {playerDefensiveStatInfoList}} = req;
      dataRef.set({
        playerDefensiveStatInfoList
      });
      break;
    default:
      const {body} = req;
      const property = `player${capitalizeFirstLetter(dataType)}StatInfoList`;
      dataRef.set({
        [property]: body[property] || ''
      });
      break;
  }

  res.sendStatus(200);
});

// ROSTERS

router.post('/:platform/:leagueId/freeagents/roster', (req, res) => {
  const db = admin.database();
  const ref = db.ref();
  const {platform, leagueId} = req.params;
  const dataRef = ref.child(`data/${platform}/${leagueId}/freeagents`);
  const {body: {rosterInfoList}} = req;

  dataRef.set({
    rosterInfoList
  });
  res.sendStatus(200);
});

router.post('/:platform/:leagueId/team/:teamId/roster', (req, res) => {
  const db = admin.database();
  const ref = db.ref();
  const {platform, leagueId, teamId} = req.params;
  const dataRef = ref.child(`data/${platform}/${leagueId}/team/${teamId}`);
  const {body: {rosterInfoList}} = req;
  dataRef.set({
    rosterInfoList
  });
  res.sendStatus(200);
});

module.exports = router;
