import React from 'react';

import ListPage from '../ListPage/ListPage';
import cardInfo from './cardInfo';

const Players = () => {
  return (
    <ListPage
      page='players'
      individualLink='player'
      item_id='player_id'
      itensPerPage='20'
      cardInfo={cardInfo}
    />
  );
};

export default Players;
