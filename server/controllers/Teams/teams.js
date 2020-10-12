const { request, response } = require('express');
const query = require('../../databaseQuery');
const { teamList, teamInfo, statsDescriptions } = require('./queryAttributes');

const orderByKeys = [
  { description: 'Name', value: 'name' },
  { description: 'Number of wins', value: 'wins' },
  { description: 'Number of losses', value: 'losses' },
  { description: 'Winning percentage', value: 'winning_percentage' },
  { description: 'Points per game', value: 'points_per_game' },
  { description: 'Opponent points per game', value: 'opponent_points_per_game' },
  { description: 'Average point differential', value: 'points_per_game_difference' },
];

/**
 * Get a list of teams
 * @query search (ilike name), order_by (orderByKeys), order (asc, desc), id (specific team id)
 */
const getTeams = async (request, response) => {
  const { search, order_by, order } = request.query;

  const attributes = teamList;
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
 *  @returns Info from team
 *  @params team_id
 */
const getTeamInfo = async (request, response) => {
  const { team_id } = request.params;
  const attributes = teamInfo;
  const target = `teams t inner join team_stats ts on t.team_id = ts.team_id`;
  const whereString = 't.team_id = ' + team_id + ' ';

  const queryResponse = await query(attributes, target, whereString);

  return response.status(200).json(queryResponse);
};

// define attriutes that have inverted comparasion
const smallIsBetter = ['losses', 'personal_fouls'];

/**
 * @returns stats of a team
 * @params team_id
 */
const getTeamStats = async (request, response) => {
  const { team_id } = request.params;

  let attributes = Object.keys(statsDescriptions);
  attributes = attributes.concat(
    attributes.map((att) => {
      return 'opponent_stat_' + att;
    })
  );

  const target = `team_stats ts`;
  const whereString = 'ts.team_id = ' + team_id;
  const queryResponse = await query(attributes, target, whereString);

  if (queryResponse.data.length > 0) queryResponse.data = queryResponse.data[0];

  return response.status(200).json(queryResponse);
};

/**
 *  @returns keys and descriptions for stats of a team
 */
const getTeamAttributesInfo = async (request, response) => {
  return response.status(200).json({
    errors: null,
    data: { descriptions: statsDescriptions, smallIsBetter },
  });
};

module.exports = {
  getTeams,
  getPossibleOrderByKeys,
  getTeamInfo,
  getTeamStats,
  getTeamAttributesInfo,
};
