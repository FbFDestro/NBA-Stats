const { request, response } = require('express');
const query = require('../databaseQuery');

const orderByKeys = [
  { description: 'Name', value: 'name' },
  { description: 'Position', value: 'position' },
  { description: 'Team', value: 'team_name' },
  { description: 'Points', value: 'points' },
  { description: 'Efficiency rating', value: 'efficiency' },
  { description: 'Assists', value: 'assists' },
  { description: 'Rebounds', value: 'rebounds' },
  { description: 'Field points made', value: 'field_points' },
  { description: 'Three points made', value: 'three_points' },
];

const getPlayers = async (request, response) => {
  const { search, order_by, order, id } = request.query;

  const attributes = [
    'p.player_id',
    'p.yahoo_name as name',
    'p.jersey',
    'p.position',
    'p.photo_url',
    't.team_id',
    't.key as team_name',
    't.wikipedia_logo_url as team_logo_url',
    'ps.points',
    'ps.player_efficiency_rating as efficiency',
    'ps.assists',
    'ps.rebounds',
    'ps.field_goals_made as field_points',
    'ps.three_pointers_made as three_points',
  ];
  const target = `players p inner join player_stats ps on p.player_id = ps.player_id inner join teams t on p.team_id = t.team_id`;

  let whereString = '',
    extraConditionsString = null;
  if (search) {
    whereString = "p.yahoo_name ilike '%" + search + "%' ";
  }
  if (id) {
    if (search) whereString += ' and ';
    whereString += 't.team_id = ' + id + ' ';
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
  console.log(queryResponse);

  return response.status(queryResponse.error == null ? 200 : 500).json(queryResponse);
};

const getPossibleOrderByKeys = async (request, response) => {
  return response.status(200).json({
    errors: null,
    data: orderByKeys,
  });
};

/*
const getPointsPerTeam = async (request, response) => {
  const { team_id } = request.query;

  // select name, points from player_stats where team_id = 1;

  const attributes = ['name as label', 'cast(points as float) as y'];
  const target = 'player_stats';
  const whereString = 'team_id = ' + team_id + ' ';

  const queryResponse = await query(attributes, target, whereString);
  return response.status(queryResponse.error == null ? 200 : 500).json(queryResponse);
};
*/

module.exports = {
  getPlayers,
  getPossibleOrderByKeys,
};
