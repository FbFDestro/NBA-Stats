import React from 'react';
import { useParams } from 'react-router-dom';

const PlayerPage = () => {
  const { player_id } = useParams();

  return (
    <>
      <h1>{player_id}</h1>
    </>
  );
};

export default PlayerPage;
