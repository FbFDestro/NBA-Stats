import React from 'react';

import ListPage from '../ListPage/ListPage';
import cardInfo from './cardInfo';

const Teams = () => {
  return (
    <ListPage
      page='teams'
      individualLink='team'
      item_id='team_id'
      itensPerPage='9'
      cardInfo={cardInfo}
    />
  );
};

export default Teams;
