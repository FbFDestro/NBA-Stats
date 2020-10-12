const express = require('express');
const router = express.Router();

const {
  getTeams,
  getPossibleOrderByKeys,
  getTeamInfo,
  getTeamStats,
  getTeamAttributesInfo,
  getTeamsBasic,
  compareTeams,
} = require('../controllers/Teams/teams');

router.use(express.json()); // for parsing application/json
router.use(
  express.urlencoded({
    extended: true,
  })
);

/**
 * Get a list of teams
 */
router.get('/', getTeams);

/**
 * Get a list of teams with only basic information (id, name, photo_url)
 */
router.get('/basicInfoList', getTeamsBasic);

/**
 * Get a list of possible order by keys for teams
 */
router.get('/possibleOrderByKeys', getPossibleOrderByKeys);

/**
 * Get info from a team
 */
router.get('/info/:team_id', getTeamInfo);

/**
 * Get stats from a team
 */
router.get('/stats/:team_id', getTeamStats);

/**
 * Get stats attributes descriptions
 */
router.get('/attributesInfo', getTeamAttributesInfo);

/**
 * Get personal info + stats from two teams
 */
router.get('/compare/:team1_id/:team2_id', compareTeams);

module.exports = router;
