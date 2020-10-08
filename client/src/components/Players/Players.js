import React from 'react';

import ListPage from '../ListPage/ListPage';

const Players = () => {
  const cardInfo = {
    logo_key: 'photo_url',
    infobox: [
      {
        smallDescription: 'Team',
        imageKey: 'team_logo_url',
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
    ],
  };
  return (
    <ListPage page='players' item_id='player_id' itensPerPage='20' cardInfo={cardInfo} />
  );
};

export default Players;
