const { request, response } = require('express');
const query = require('../databaseQuery');

const getTeams = async (request, response) => {
  const { search, order_by } = request.query;

  const attributes = [
    't.team_id',
    'ts.name',
    't.wikipedia_logo_url as logo_url',
    'ts.wins',
    'ts.losses',
    'cast(ts.wins as float) / cast(ts.games as float) as winning_percentage',
    'ts.points',
    'cast(ts.points as float) / cast(ts.games as float) as points_per_game',
    'ts.opponent_stat_points',
    'cast(ts.opponent_stat_points as float) / cast(ts.games as float) as opponent_points_per_game',
    '(cast(ts.points as float) / cast(ts.games as float)) - (cast(ts.opponent_stat_points as float) / cast(ts.games as float)) as points_per_game_difference',
  ];
  const target = `teams t inner join team_stats ts on t.team_id = ts.team_id`;

  let whereString = null,
    extraConditionsString = null;
  if (search) {
    whereString = "ts.name ilike '%" + search + "%' ";
  }

  if (order_by) {
    extraConditionsString = 'order by ' + order_by + ' ';
  }

  const queryResponse = await query(
    attributes,
    target,
    whereString,
    extraConditionsString
  );

  // if (queryResponse.error === null) { }

  return response.status(200).json(queryResponse);
};

const getPossibleOrderByKeys = async (request, response) => {
  return response.status(200).json({
    errors: null,
    data: [
      'name',
      'wins',
      'losses',
      'winning_percentage',
      'points_per_game',
      'opponent_stat_points',
      'opponent_points_per_game',
      'points_per_game_difference',
    ],
  });
};

module.exports = {
  getTeams,
  getPossibleOrderByKeys,
};
