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
    't.team_id',
    't.key as team_name',
    't.wikipedia_logo_url as team_logo_url',
  ];
  const target = `players p inner join teams t on p.team_id = t.team_id`;
  const whereString = 'player_id = ' + player_id + ' ';

  const queryResponse = await query(attributes, target, whereString);

  if (
    queryResponse.data &&
    queryResponse.data.length > 0 &&
    queryResponse.data[0].birth_date
  ) {
    let birth = queryResponse.data[0].birth_date;
    birth = birth.slice(0, birth.indexOf('T'));
    queryResponse.data[0].birth_date = birth;
  }

  if (queryResponse.data[0].salary) {
    queryResponse.data[0].salary = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(queryResponse.data[0].salary);
  }

  return response.status(200).json(queryResponse);
};

const statsDescriptions = {
  name: "Player's name",
  team: 'The abbreviation of the Team',
  position: "Player's position in the starting lineup",
  started: 'Number of games started',
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
  offensive_rebounds_percentage: 'Total offensive rebounds percentage',
  defensive_rebounds_percentage: 'Total defensive rebounds percentage',
  total_rebounds_percentage: 'The player/team total rebounds percentage',
  assists: 'Total assists',
  steals: 'Total steals',
  blocked_shots: 'Total blocked shots',
  turnovers: 'Total turnovers',
  personal_fouls: 'Total personal fouls',
  points: 'Total points scored',
  true_shooting_attempts: "The player's true shooting attempts",
  true_shooting_percentage: "The player's true shooting percentage",
  player_efficiency_rating: "The player's linear weight efficiency rating",
  assists_percentage: "The player's assist percentage",
  steals_percentage: "The player's steal percentage",
  blocks_percentage: "The player's block percentage",
  turn_overs_percentage: "The player's turnover percentage",
  usage_rate_percentage: "The player's usage rate percentage",
  fantasy_points_fan_duel: 'Total FanDuel daily fantasy points scored',
  fantasy_points_draft_kings: 'Total DraftKings daily fantasy points scored',
  fantasy_points_yahoo: 'Total Yahoo daily fantasy points scored',
  plus_minus: 'Total plus minus',
  double_doubles: 'Total double-doubles scored',
  triple_doubles: 'Total triple-doubles scored',
  fantasy_points_fantasy_draft: 'Total FantasyDraft daily fantasy points scored',
};

const getPlayerStats = async (request, response) => {
  const { player_id } = request.params;

  const attributes = Object.keys(statsDescriptions);

  const target = `player_stats ps`;
  const whereString = 'ps.player_id = ' + player_id;
  const queryResponse = await query(attributes, target, whereString);

  if (queryResponse.data.length > 0) queryResponse.data = queryResponse.data[0];

  return response.status(200).json(queryResponse);
};

const getPlayerAttributesInfo = async (request, response) => {
  return response.status(200).json({
    errors: null,
    data: { statsDescriptions },
  });
};

module.exports = {
  getPlayers,
  getPossibleOrderByKeys,
  getStatsPerTeam,
  getPlayerInfo,
  getPlayerStats,
  getPlayerAttributesInfo,
};
