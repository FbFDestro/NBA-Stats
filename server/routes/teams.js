const express = require('express');
const router = express.Router();

const { getTeams, getPossibleOrderByKeys } = require('../controllers/teams');

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
 */
router.get('/', getTeams);

/**
 * Get a list of possible order by keys for teams
 */
router.get('/possibleOrderByKeys', getPossibleOrderByKeys);

module.exports = router;
