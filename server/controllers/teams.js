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

const getTeamInfo = async (request, response) => {
  const { team_id } = request.params;
  const attributes = [
    't.team_id',
    'ts.name',
    't.wikipedia_logo_url as logo_url',
    't.city',
    't.conference',
    't.division',
  ];
  const target = `teams t inner join team_stats ts on t.team_id = ts.team_id`;
  const whereString = 't.team_id = ' + team_id + ' ';

  const queryResponse = await query(attributes, target, whereString);

  return response.status(200).json(queryResponse);
};

const descriptions = {
  team_id: 'The unique ID of the team',
  name: 'Team name',
  wins: 'Total number of wins',
  losses: 'Total number of losses',
  possessions: "Team's estimated number of possessions",
  games: 'Total games played',
  fantasy_points: 'Total fantasy points',
  minutes: 'Total number of minutes played',
  field_goals_made: 'Total number of field goals made',
  field_goals_attempted: 'Total number of field goals attempted',
  field_goals_percentage: 'Total field goal percentage',
  effective_field_goals_percentage: 'Total effective field goals percentage',
  two_pointers_made: 'Total two pointers made',
  two_pointers_attempted: 'Total two pointers attempted',
  two_pointers_percentage: 'Total two pointers percentage',
  three_pointers_made: 'Total three pointers made',
  three_pointers_attempted: 'Total three pointers attempted',
  three_pointers_percentage: 'Total three pointers percentage',
  free_throws_made: 'Total free throws made',
  free_throws_attempted: 'Total free throws attempted',
  free_throws_percentage: 'Total free throws percentage',
  offensive_rebounds: 'Total offensive rebounds',
  defensive_rebounds: 'Total defensive rebounds',
  rebounds: 'Total rebounds',
  assists: 'Total assists',
  steals: 'Total steals',
  blocked_shots: 'Total blocked shots',
  turnovers: 'Total turnovers',
  personal_fouls: 'Total personal fouls',
  points: 'Total points scored',
  true_shooting_attempts: "The player's true shooting attempts",
  true_shooting_percentage: "The player's true shooting percentage",
  fantasy_points_fan_duel: 'Total FanDuel daily fantasy points scored',
  fantasy_points_draft_kings: 'Total DraftKings daily fantasy points scored',
  fantasy_points_yahoo: 'Total Yahoo daily fantasy points scored',
  fantasy_points_fantasy_draft: 'Total FantasyDraft daily fantasy points scored',
  plus_minus: 'Total plus minus',
  double_doubles: 'Total double-doubles scored',
  triple_doubles: 'Total triple-doubles scored',
};

const smallIsBetter = ['losses', 'personal_fouls'];

const getTeamStats = async (request, response) => {
  const { team_id } = request.params;

  let attributes = Object.keys(descriptions);
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

const getTeamAttributesInfo = async (request, response) => {
  return response.status(200).json({
    errors: null,
    data: { descriptions, smallIsBetter },
  });
};

module.exports = {
  getTeams,
  getPossibleOrderByKeys,
  getTeamInfo,
  getTeamStats,
  getTeamAttributesInfo,
};
