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
  const target = `players p inner join player_stats ps on p.player_id = ps.player_id inner join teams t on ps.team_id = t.team_id`;
  // depending on which table I use to join with teams, I can get an inconsistency because ps.team id != p.team_id in some cases

  let whereString = '',
    extraConditionsString = null;
  if (search) {
    whereString = "p.yahoo_name ilike '%" + search + "%' ";
  }
  if (id) {
    if (search) whereString += ' and ';
    whereString += 't.team_id = ' + id + ' ';
  }
  if (whereString === '') whereString = null;

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

  return response.status(queryResponse.error == null ? 200 : 500).json(queryResponse);
};

const getPossibleOrderByKeys = async (request, response) => {
  return response.status(200).json({
    errors: null,
    data: orderByKeys,
  });
};

const getStatsPerTeam = async (request, response) => {
  const { team_id } = request.params;

  const attributes = [
    'name',
    'cast(points as float)',
    'cast(player_efficiency_rating as float) as efficiency',
  ];
  const target = 'player_stats';
  const whereString = 'team_id = ' + team_id + ' ';

  const queryResponse = await query(attributes, target, whereString);
  if (queryResponse.error) {
    return response.stats(500).json(queryResponse);
  }

  const getSortedArray = (data, key) => {
    return data
      .map((player) => {
        return { label: player['name'], value: player[key] };
      })
      .sort((p1, p2) => p2.value - p1.value);
  };

  const sortedPoints = getSortedArray(queryResponse.data, 'points');
  const sortedEfficiency = getSortedArray(queryResponse.data, 'efficiency');

  return response.status(200).json({
    error: null,
    data: {
      points: sortedPoints,
      efficiency: sortedEfficiency,
    },
  });
};

const getPlayerInfo = async (request, response) => {
  const { player_id } = request.params;
  const attributes = [
    'player_id',
    'yahoo_name as name',
    'photo_url',
    'jersey',
    'position',
    'height',
    'weight',
    'birth_city',
    'birth_date',
    'salary',
  ];
  const target = `players`;
  const whereString = 'player_id = ' + player_id + ' ';

  const queryResponse = await query(attributes, target, whereString);
  return response.status(200).json(queryResponse);
};

module.exports = {
  getPlayers,
  getPossibleOrderByKeys,
  getStatsPerTeam,
  getPlayerInfo,
};
