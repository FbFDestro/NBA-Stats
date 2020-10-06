const query = require('../databaseQuery');

const getTeams = async (request, response) => {
  /*
  if (request.query.search) { }
  if(request.query.order_by){}
  */

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
  const queryResponse = await query(attributes, target, null, null);

  // if (queryResponse.error === null) { }

  return response.status(200).json(queryResponse);
};

module.exports = {
  getTeams,
};
