const express = require('express');
const router = express.Router();

const {
  getTeams,
  getPossibleOrderByKeys,
  getTeamInfo,
  getTeamStats,
  getTeamAttributesInfo,
} = require('../controllers/teams');

router.use(express.json()); // for parsing application/json
router.use(
  express.urlencoded({
    extended: true,
  })
);

/**
 * Get a list of teams
 * @queryParams {string}: search (optional)
 * @queryParams {string}: order_by (optional)
 * @queryParams {string}: order (optional)
 */
router.get('/', getTeams);

/**
 * Get a list of possible order by keys for teams
 */
router.get('/possibleOrderByKeys', getPossibleOrderByKeys);

router.get('/info/:team_id', getTeamInfo);
router.get('/stats/:team_id', getTeamStats);
router.get('/attributesInfo', getTeamAttributesInfo);

module.exports = router;
