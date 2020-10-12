import React from 'react';
import Compare from '../Compare/Compare';

import { infoBoxes } from './carInfo';

const ComparePlayers = () => {
  return (
    <Compare
      page='players'
      skipList={['name', 'position', 'team']}
      inverted={['personal_fouls']}
      item_idKey='player_id'
      infoBoxes={infoBoxes}
    />
  );
};

export default ComparePlayers;
