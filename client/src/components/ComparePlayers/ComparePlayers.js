import React, { useEffect, useState } from 'react';
import ComparasionResult from './ComparasionResult';
import PlayerSelection from './PlayerSelection';

const ComparePlayers = () => {
  const [playersId, setPlayersId] = useState([null, null]);

  useEffect(() => {
    // setPlayersId([20000572, 20000443]);
  }, []);

  return (
    <div>
      <h1>Compare two players</h1>
      <PlayerSelection playersId={playersId} setPlayersId={setPlayersId} />
      {playersId.length === 2 && playersId[0] && playersId[1] ? (
        <ComparasionResult playersId={playersId} />
      ) : null}
    </div>
  );
};

export default ComparePlayers;
