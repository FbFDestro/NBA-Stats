import React, { useState, useEffect } from 'react';
import axios from 'axios';

const tableReducedLines = 15;

const PlayerStatsTable = ({ player_id }) => {
  const [playerAttributesInfo, setPlayerAttributesInfo] = useState({});
  const [showFull, setShowFull] = useState(false);
  useEffect(() => {
    let isMounted = true;
    const fetchAttributesInfo = async () => {
      const response = await axios.get('/api/players/attributesInfo');
      if (isMounted) {
        setPlayerAttributesInfo(response.data.data);
      }
    };
    fetchAttributesInfo();

    return () => (isMounted = false);
  }, []);

  const [playerData, setPlayerData] = useState(null);
  useEffect(() => {
    let isMounted = true;
    const fetchPlayerData = async () => {
      const response = await axios.get('/api/players/stats/' + player_id);
      if (isMounted) {
        if (response.data.data) setPlayerData(response.data.data);
      }
    };
    fetchPlayerData();

    return () => (isMounted = false);
  }, [player_id]);

  let tableResult = null;

  const playerList = [];
  if (playerData) {
    let countLines = 0;
    for (const data in playerData) {
      if (!showFull && countLines++ > tableReducedLines) break;

      if (data === 'name' || data === 'player_id') continue;

      const playerValue = playerData[data];

      playerList.push(
        <tr key={data}>
          <td className='description'>{playerAttributesInfo.statsDescriptions[data]}</td>
          <td className={`value`}>{playerData[data]}</td>
        </tr>
      );
    }

    tableResult = (
      <div className='playerDetailsBox'>
        <table className='playerDetails'>
          <thead>
            <tr>
              <th>Player stats</th>
              <th>{playerData['name']}</th>
            </tr>
          </thead>
          <tbody>{playerList}</tbody>
        </table>
        <button
          className='btnShowMore'
          onClick={() => {
            setShowFull(!showFull);
          }}
        >
          {showFull ? 'Show less' : 'Show more'}
        </button>
      </div>
    );
  }

  return tableResult;
};

export default PlayerStatsTable;
