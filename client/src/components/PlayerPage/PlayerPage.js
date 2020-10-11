import React from 'react';
import { useParams } from 'react-router-dom';
import InfoHeader from '../InfoHeader/InfoHeader';
import PlayerStatsTable from './PlayerStatsTable';

import './PlayerPage.css';

const PlayerPage = () => {
  const { player_id } = useParams();

  const infoHeaderData = {
    page: 'players',
    page_id: player_id,
    logo_url: 'photo_url',
    name: 'name',
    infoBoxes: [
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
        smallDescription: 'City',
        description: 'City in with the player was born',
      },
      {
        dataKey: 'birth_date',
        smallDescription: 'Born',
        description: "Player's date of birth",
      },
      {
        dataKey: 'salary',
        description: "Player's salary for the season",
      },
    ],
  };

  return (
    <>
      <InfoHeader data={infoHeaderData} />
      <PlayerStatsTable player_id={player_id} />
    </>
  );
};

export default PlayerPage;
