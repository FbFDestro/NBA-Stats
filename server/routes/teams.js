const express = require('express');
const router = express.Router();

const { getTeams } = require('../controllers/teams');

router.use(express.json()); // for parsing application/json
router.use(
  express.urlencoded({
    extended: true,
  })
);

router.get('/', getTeams);

module.exports = router;
