const cardInfo = {
  logo_key: 'photo_url',
  infobox: [
    {
      smallDescription: 'Team',
      imageKey: 'team_logo_url',
      linkKey: 'team_id',
      linkPrefix: '/team/',
      description: "Player's team",
      dataKey: 'team_name',
    },
    {
      smallDescription: 'Jersey',
      description: "Player's jersey number",
      dataKey: 'jersey',
    },
    {
      smallDescription: 'POS',
      description: 'Position',
      dataKey: 'position',
    },
    {
      smallDescription: 'Pts',
      description: 'Points scored',
      dataKey: 'points',
    },
    {
      smallDescription: 'Eff',
      description: 'Player efficient rating',
      dataKey: 'efficiency',
    },
    {
      smallDescription: 'Ast',
      description: 'Assists',
      dataKey: 'assists',
    },
    {
      smallDescription: 'Reb',
      description: 'Rebounds',
      dataKey: 'rebounds',
    },
    {
      smallDescription: 'FPM',
      description: 'Field points made',
      dataKey: 'field_points',
    },
    {
      smallDescription: 'TPM',
      description: 'Three points made',
      dataKey: 'three_points',
    },
  ],
};

export default cardInfo;
