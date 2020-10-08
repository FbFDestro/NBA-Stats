const express = require('express');
const router = express.Router();

const { getPlayers, getPossibleOrderByKeys } = require('../controllers/players');

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

/**
 * Get a list of possible order by keys for teams
 */
router.get('/possibleOrderByKeys', getPossibleOrderByKeys);

module.exports = router;
