const express = require('express');
const router = express.Router();

const {
  getPlayers,
  getPossibleOrderByKeys,
  getStatsPerTeam,
  getPlayerInfo,
  getPlayerStats,
  getPlayerAttributesInfo,
  comparePlayers,
  getPlayersBasic,
} = require('../controllers/Players/players');

router.use(express.json()); // for parsing application/json
router.use(
  express.urlencoded({
    extended: true,
  })
);

/**
 * Get a list of players
 * @queryParams {string}: search (optional)
 * @queryParams {string}: order_by (optional)
 */
router.get('/', getPlayers);

router.get('/basicInfoList', getPlayersBasic);

/**
 * Get a list of possible order by keys for teams
 */
router.get('/possibleOrderByKeys', getPossibleOrderByKeys);
router.get('/StatsPerTeam/:team_id', getStatsPerTeam);
router.get('/info/:player_id', getPlayerInfo);

router.get('/stats/:player_id', getPlayerStats);
router.get('/attributesInfo', getPlayerAttributesInfo);

router.get('/compare/:player1_id/:player2_id', comparePlayers);

module.exports = router;
