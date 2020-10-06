const express = require('express');
const router = express.Router();

const { getTeams, getPossibleOrderByKeys } = require('../controllers/teams');

router.use(express.json()); // for parsing application/json
router.use(
  express.urlencoded({
    extended: true,
  })
);

router.get('/', getTeams);
router.get('/possibleOrderByKeys', getPossibleOrderByKeys);

module.exports = router;
