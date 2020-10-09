const cardInfo = {
  logo_key: 'logo_url',
  infobox: [
    {
      smallDescription: 'Wins',
      description: 'Number of wins',
      dataKey: 'wins',
      color: 'green',
    },
    {
      smallDescription: 'Losses',
      description: 'Number of losses',
      dataKey: 'losses',
      color: 'red',
    },
    {
      smallDescription: 'PCT',
      description: 'Winning percentage',
      dataKey: 'winning_percentage',
      fixed: 2,
    },
    {
      smallDescription: 'PPG',
      description: 'Points per game',
      dataKey: 'points_per_game',
      fixed: 1,
    },
    {
      smallDescription: 'OPPG',
      description: 'Opponent points per game',
      dataKey: 'opponent_points_per_game',
      fixed: 1,
    },
    {
      smallDescription: 'DIFF',
      description: 'Average point differential',
      dataKey: 'points_per_game_difference',
      fixed: 1,
      color: 'positive_green',
    },
  ],
};

export default cardInfo;
