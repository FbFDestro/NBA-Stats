import React from 'react';
import Compare from '../Compare/Compare';

import { infoBoxes } from './carInfo';

const CompareTeams = () => {
  return (
    <Compare
      page='teams'
      skipList={['name', 'team_id']}
      inverted={['personal_fouls', 'losses']}
      item_idKey='team_id'
      infoBoxes={infoBoxes}
    />
  );
};

export default CompareTeams;
