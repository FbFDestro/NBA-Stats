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

const descriptions = {
  team_id: 'The unique ID of the team',
  name: 'Team name',
  wins: 'Total number of wins',
  losses: 'Total number of losses',
  possessions: "The team's estimated number of possessionsx",
  games: 'The number of games played',
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

const getTeamById = async (request, response) => {
  const { team_id } = request.params;

  const attributes = [
    'ts.team_id',
    'ts.name',
    'wins',
    'losses',
    'possessions',
    'games',
    'fantasy_points',
    'minutes',
    'field_goals_made',
    'field_goals_attempted',
    'field_goals_percentage',
    'effective_field_goals_percentage',
    'two_pointers_made',
    'two_pointers_attempted',
    'two_pointers_percentage',
    'three_pointers_made',
    'three_pointers_attempted',
    'three_pointers_percentage',
    'free_throws_made',
    'free_throws_attempted',
    'free_throws_percentage',
    'offensive_rebounds',
    'defensive_rebounds',
    'rebounds',
    'assists',
    'steals',
    'blocked_shots',
    'turnovers',
    'personal_fouls',
    'points',
    'true_shooting_attempts',
    'true_shooting_percentage',
    'fantasy_points_fan_duel',
    'fantasy_points_draft_kings',
    'fantasy_points_yahoo',
    'fantasy_points_fantasy_draft',
    'plus_minus',
    'double_doubles',
    'triple_doubles',
    'opponent_stat_team_id',
    'opponent_stat_name',
    'opponent_stat_wins',
    'opponent_stat_losses',
    'opponent_stat_possessions',
    'opponent_stat_games',
    'opponent_stat_fantasy_points',
    'opponent_stat_minutes',
    'opponent_stat_seconds',
    'opponent_stat_field_goals_made',
    'opponent_stat_field_goals_attempted',
    'opponent_stat_field_goals_percentage',
    'opponent_stat_effective_field_goals_percentage',
    'opponent_stat_two_pointers_made',
    'opponent_stat_two_pointers_attempted',
    'opponent_stat_two_pointers_percentage',
    'opponent_stat_three_pointers_made',
    'opponent_stat_three_pointers_attempted',
    'opponent_stat_three_pointers_percentage',
    'opponent_stat_free_throws_made',
    'opponent_stat_free_throws_attempted',
    'opponent_stat_free_throws_percentage',
    'opponent_stat_offensive_rebounds',
    'opponent_stat_defensive_rebounds',
    'opponent_stat_rebounds',
    'opponent_stat_assists',
    'opponent_stat_steals',
    'opponent_stat_blocked_shots',
    'opponent_stat_turnovers',
    'opponent_stat_personal_fouls',
    'opponent_stat_points',
    'opponent_stat_true_shooting_attempts',
    'opponent_stat_true_shooting_percentage',
    'opponent_stat_fantasy_points_fan_duel',
    'opponent_stat_fantasy_points_draft_kings',
    'opponent_stat_fantasy_points_yahoo',
    'opponent_stat_fantasy_points_fantasy_draft',
    'opponent_stat_plus_minus',
    'opponent_stat_double_doubles',
    'opponent_stat_triple_doubles',
  ];

  const target = `team_stats ts inner join teams t on ts.team_id = t.team_id`;
  const whereString = 'ts.team_id = ' + team_id;
  const queryResponse = await query(attributes, target, whereString);

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
  getTeamById,
  getTeamAttributesInfo,
};
