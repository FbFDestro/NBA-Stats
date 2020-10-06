const query = require('../databaseQuery');

const getTeams = async (request, response) => {
  const attributes = [
    't.team_id',
    'ts.name',
    't.wikipedia_logo_url as logo_url',
    'ts.wins',
    'ts.losses',
    'ts.games',
    'ts.points',
    'ts.opponent_stat_points',
  ];
  const from = `teams t inner join team_stats ts on t.team_id = ts.team_id`;
  const queryResponse = await query(attributes, from, '');

  if (queryResponse.error === null) {
    // no error from database
    const { data } = queryResponse;
    for (team of data) {
      team['winning_percentage'] = team['wins'] / team['games'];
      team['points_per_game'] = team['points'] / team['games'];
      team['opponent_points_per_game'] = team['opponent_stat_points'] / team['games'];
      team['points_per_game_difference'] =
        team['points_per_game'] - team['opponent_points_per_game'];

      delete team['games']; // only used to calculate other values
    }
  }

  return response.status(200).json(queryResponse);
};

module.exports = {
  getTeams,
};
