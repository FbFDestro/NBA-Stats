const { request, response } = require('express');
const query = require('../databaseQuery');

const orderByKeys = [
  { description: 'Name', value: 'name' },
  { description: 'Position', value: 'position' },
  { description: 'Number of losses', value: 'losses' },
  { description: 'Team', value: 'team_id' },
  { description: 'Points', value: 'points' },
  { description: 'Efficiency rating', value: 'efficiency' },
  { description: 'Assists', value: 'assists' },
  { description: 'Rebounds', value: 'rebounds' },
  { description: 'Field points made', value: 'field_points' },
  { description: 'Three points made', value: 'three_points' },
];

const getPlayers = async (request, response) => {
  const { search, order_by, order } = request.query;

  const attributes = [
    'p.player_id',
    'p.yahoo_name as name',
    'p.jersey',
    'p.position',
    'p.photo_url',
    't.team_id',
    't.key',
    't.wikipedia_logo_url as team_logo_url',
    'ps.points',
    'ps.player_efficiency_rating as efficiency',
    'ps.assists',
    'ps.rebounds',
    'ps.field_goals_made as field_goals',
    'ps.three_pointers_made as three_points',
  ];
  const target = `players p inner join player_stats ps on p.player_id = ps.player_id inner join teams t on p.team_id = t.team_id`;

  let whereString = null,
    extraConditionsString = null;
  if (search) {
    whereString = "p.yahoo_name ilike '%" + search + "%' ";
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
  getPlayers,
  getPossibleOrderByKeys,
};
