const { request, response } = require('express');
const query = require('../databaseQuery');

const orderByKeys = [
  { description: 'Name', value: 'name' },
  { description: 'Number of wins', value: 'wins' },
  { description: 'Number of losses', value: 'losses' },
  { description: 'Winning percentage', value: 'winning_percentage' },
  { description: 'Points per game', value: 'points_per_game' },
  { description: 'Opponent points per game', value: 'opponent_points_per_game' },
  { description: 'Average point differential', value: 'points_per_game_difference' },
];

const getTeams = async (request, response) => {
  const { search, order_by, order } = request.query;

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

  if (order_by && orderByKeys.find(({ value }) => value === order_by)) {
    extraConditionsString = 'order by ' + order_by + ' ';
    if ((order && order == 'asc') || order == 'desc') {
      extraConditionsString += order + ' ';
    }
  }

  const queryResponse = await query(
    attributes,
    target,
    whereString,
    extraConditionsString
  );

  return response.status(200).json(queryResponse);
};

const getPossibleOrderByKeys = async (request, response) => {
  return response.status(200).json({
    errors: null,
    data: orderByKeys,
  });
};

module.exports = {
  getTeams,
  getPossibleOrderByKeys,
};
