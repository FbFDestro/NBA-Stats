import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemCard from '../ItemCard/ItemCard';

import { infoBoxes } from './carInfo';

import './ComparePlayer.css';
import ComparePlayersStatsList from './ComparePlayersStatsList';

const ComparePlayers = ({ player1_id, player2_id }) => {
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

  const [playersData, setplayersData] = useState(null);
  useEffect(() => {
    let isMounted = true;
    const fetchplayersData = async () => {
      const response = await axios.get(
        `/api/players/compare/${player1_id}/${player2_id}`
      );
      if (isMounted) {
        if (response.data.data) setplayersData(response.data.data);
      }
    };
    fetchplayersData();

    return () => (isMounted = false);
  }, [player1_id, player2_id]);

  const playersBox = [];
  if (playersData) {
    for (let i = 0; i < playersData.length; i++) {
      const item = playersData[i];
      playersBox.push(
        <div key={item['player_id']} className='playerBoxCompare'>
          <ItemCard
            key={item['player_id']}
            link={`/player/${item['player_id']}`}
            logo={item['photo_url']}
            name={item['name']}
            infoboxItems={infoBoxes}
            data={item}
          />
          <ComparePlayersStatsList
            player1_data={playersData[i]}
            player2_data={playersData[i ^ 1]}
            descriptions={playerAttributesInfo.statsDescriptions}
            showFull={showFull}
          />
        </div>
      );
    }
  }

  return (
    <div className='compare'>
      <div className='compareBox'>{playersBox}</div>
      <button onClick={() => setShowFull(!showFull)}>
        {!showFull ? 'Show more' : 'Show less'}
      </button>
    </div>
  );
};

export default ComparePlayers;
