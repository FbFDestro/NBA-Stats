import React from 'react';
import { useParams } from 'react-router-dom';

const PlayerPage = () => {
  const { player_id } = useParams();

  /*

  const infoHeaderData = {
    page: 'teams',
    page_id: team_id,
    logo_url: 'logo_url',
    name: 'name',
    infoBoxes: [
      { key: 'city', smallDescription: 'City', description: "Team's city" },
      {
        key: 'conference',
        smallDescription: 'Conference',
        description: "Team's conference",
      },
      { key: 'division', smallDescription: 'Division', description: "Team's division" },
    ],
  };
  */

  return (
    <>
      <h1>{player_id}</h1>
    </>
  );
};

export default PlayerPage;
