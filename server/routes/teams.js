const express = require('express');
const router = express.Router();

const {
  getTeams,
  getPossibleOrderByKeys,
  getTeamInfo,
  getTeamStats,
  getTeamAttributesInfo,
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

module.exports = router;
