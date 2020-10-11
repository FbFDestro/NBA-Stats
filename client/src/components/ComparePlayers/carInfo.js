const infoBoxes = [
  {
    dataKey: 'team_name',
    smallDescription: 'Team',
    imageKey: 'team_logo_url',
    linkKey: 'team_id',
    linkPrefix: '/team/',
    description: "Player's team",
  },
  {
    dataKey: 'jersey',
    smallDescription: 'Jersey',
    description: "Player's jersey number",
  },
  {
    dataKey: 'position',
    smallDescription: 'POS',
    description: 'Position',
  },
  {
    dataKey: 'height',
    smallDescription: 'Height',
    description: "Player's height in inches",
  },
  {
    dataKey: 'weight',
    smallDescription: 'Weight',
    description: "Player's weight in pounds (lbs)",
  },
  {
    dataKey: 'birth_city',
    description: 'City in with the player was born',
  },
];

module.exports = {
  infoBoxes,
};
