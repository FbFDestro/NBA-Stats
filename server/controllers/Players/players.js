const { request, response } = require('express');
const query = require('../../databaseQuery');

const queryAttributes = require('./queryAttributes');

/**
 * List of descriptions and keys to possible order by keys for players
 */
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

function convertDateFormat(date) {
  return date.slice(0, date.indexOf('T'));
}

/**
 * Get a list of players
 * @query search (ilike name), order_by (orderByKeys), order (asc, desc), id (specific team id)
 */
const getPlayers = async (request, response) => {
  const { search, order_by, order, id } = request.query;

  const attributes = queryAttributes.playersList;
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
    if (order && (order == 'asc' || order == 'desc')) {
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

/**
 * @returns list of possible order by keys of team
 */
const getPossibleOrderByKeys = async (request, response) => {
  return response.status(200).json({
    errors: null,
    data: orderByKeys,
  });
};

/**
 * @returns Points and efficiency of players of a team
 * @params team_id
 */
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

  // sorted stats are used to form a chart
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

/**
 *  @returns Personal info from a player
 *  @params player_id
 */
const getPlayerInfo = async (request, response) => {
  const { player_id } = request.params;
  const attributes = queryAttributes.playerPersonalInfo;

  const target = `players p inner join teams t on p.team_id = t.team_id`;
  const whereString = 'player_id = ' + player_id + ' ';

  const queryResponse = await query(attributes, target, whereString);

  if (queryResponse.data && queryResponse.data.length > 0) {
    queryResponse.data[0].birth_date = convertDateFormat(
      queryResponse.data[0].birth_date
    );
  }

  if (queryResponse.data[0].salary) {
    queryResponse.data[0].salary = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(queryResponse.data[0].salary);
  }

  return response.status(200).json(queryResponse);
};

/**
 * @return list of players basic verison (id, name and photo_url)
 * @query search (ilike name)
 */
const getPlayersBasic = async (request, response) => {
  const { search } = request.query;

  const attributes = ['p.player_id', 'p.yahoo_name as name', 'p.photo_url'];
  const target = `players p`;

  let whereString = null;
  if (search) {
    whereString = "p.yahoo_name ilike '%" + search + "%' ";
  }
  const queryResponse = await query(attributes, target, whereString);
  return response.status(queryResponse.error == null ? 200 : 500).json(queryResponse);
};

/**
 * @returns stats of a player
 * @params player_id
 */
const getPlayerStats = async (request, response) => {
  const { player_id } = request.params;

  const attributes = Object.keys(queryAttributes.statsDescriptions);

  const target = `player_stats ps`;

  const whereString = 'ps.player_id = ' + player_id;
  const queryResponse = await query(attributes, target, whereString);

  if (queryResponse.data.length > 0) queryResponse.data = queryResponse.data[0];
  return response.status(200).json(queryResponse);
};

/**
 *  @returns keys and descriptions for stats of a player
 */
const getPlayerAttributesInfo = async (request, response) => {
  return response.status(200).json({
    errors: null,
    data: { statsDescriptions: queryAttributes.statsDescriptions },
  });
};

/**
 * @return Data from two players for comparasion
 * @params player1_id, player2_id
 */
const comparePlayers = async (request, response) => {
  const { player1_id, player2_id } = request.params;

  //  generate attributes using personal info of a player + player stats values
  const attributes = queryAttributes.playerPersonalInfo.concat(
    Object.keys(queryAttributes.statsDescriptions).map((key) => `ps.${key}`)
  );

  const target =
    'players p inner join teams t on p.team_id = t.team_id inner join player_stats ps on p.player_id = ps.player_id';

  const whereString = `p.player_id = ${player1_id} or p.player_id = ${player2_id}`;

  const queryResponse = await query(attributes, target, whereString);

  if (queryResponse.data) {
    for (let i = 0; i < queryResponse.data.length; i++) {
      queryResponse.data[i].birth_date = convertDateFormat(
        queryResponse.data[i].birth_date
      );
    }
  }

  return response.status(200).json(queryResponse);
};

module.exports = {
  getPlayers,
  getPossibleOrderByKeys,
  getStatsPerTeam,
  getPlayerInfo,
  getPlayerStats,
  getPlayerAttributesInfo,
  comparePlayers,
  getPlayersBasic,
};
