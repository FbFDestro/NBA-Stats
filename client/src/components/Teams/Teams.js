import React from 'react';
import TeamCard from './TeamCard/TeamCard';

import './Team.css';

const Teams = () => {
  return (
    <div>
      <div id='filtersBox'>
        {/* Filterbox Component that recieves as props functions to act, orderByKeys*/}
      </div>
      <div id='teamsBox'>
        {
          <>
            <TeamCard />
            <TeamCard />
            <TeamCard />
            <TeamCard />
            <TeamCard />
            <TeamCard />
            <TeamCard />
            <TeamCard />
            <TeamCard />
            <TeamCard />
          </>
          /* List of cards of teams */
        }
      </div>
    </div>
  );
};

export default Teams;
