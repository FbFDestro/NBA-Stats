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
 */
router.get('/', getPlayers);

/**
 * Get a list of player with only basic information (id, name, photo_url)
 */
router.get('/basicInfoList', getPlayersBasic);

/**
 * Get a list of possible order by keys for players
 */
router.get('/possibleOrderByKeys', getPossibleOrderByKeys);

/**
 * Get stats from players of a team
 */
router.get('/StatsPerTeam/:team_id', getStatsPerTeam);

/**
 * Get personal info from a player
 */
router.get('/info/:player_id', getPlayerInfo);

/**
 * Get stats from a player
 */
router.get('/stats/:player_id', getPlayerStats);

/**
 * Get stats attributes descriptions
 */
router.get('/attributesInfo', getPlayerAttributesInfo);

/**
 * Get personal info + stats from two players
 */
router.get('/compare/:player1_id/:player2_id', comparePlayers);

module.exports = router;
