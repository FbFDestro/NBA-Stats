import React, { useState, useEffect } from 'react';
import axios from 'axios';

import InfoBox from '../InfoBox/InfoBox';

const TeamInfo = ({ team_id }) => {
  const [teamInfo, setTeamInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    const fetchTeamInfo = async () => {
      const response = await axios.get('/api/teams/info/' + team_id);
      if (isMounted) {
        if (response.data.data.length > 0) setTeamInfo(response.data.data[0]);
        setIsLoading(false);
      }
    };
    fetchTeamInfo();

    return () => (isMounted = false);
  }, [team_id]);

  let teamBox = <h1>Loading...</h1>;
  if (!isLoading && teamInfo) {
    teamBox = (
      <div id='titleInfoBox'>
        <div className='logo'>
          <img src={teamInfo['logo_url']} alt={teamInfo['name'] + ' logo'} />
          <h2>{teamInfo['name']}</h2>
        </div>

        <InfoBox
          key='city'
          smallDescription='City'
          description="Team's city"
          data={teamInfo['city']}
          bigger='big'
        />
        <InfoBox
          key='conference'
          smallDescription='Conference'
          description="Team's conference"
          data={teamInfo['conference']}
          bigger='big'
        />
        <InfoBox
          key='division'
          smallDescription='Division'
          description="Team's division"
          data={teamInfo['division']}
          bigger='big'
        />
      </div>
    );
  } else if (!isLoading) {
    teamBox = <h1>Not found!</h1>;
  }

  return teamBox;
};

export default TeamInfo;
