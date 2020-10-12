import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemCard from '../ItemCard/ItemCard';

import { infoBoxes } from './carInfo';

import './ComparePlayer.css';
import ComparePlayersStatsList from './ComparePlayersStatsList';
import InfoBox from '../InfoBox/InfoBox';

const ComparasionResult = ({ playersId }) => {
  const player1_id = playersId[0];
  const player2_id = playersId[1];

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

  const [playersData, setPlayersData] = useState(null);
  useEffect(() => {
    let isMounted = true;
    const fetchPlayersData = async () => {
      const response = await axios.get(
        `/api/players/compare/${player1_id}/${player2_id}`
      );
      if (isMounted) {
        if (response.data.data) setPlayersData(response.data.data);
      }
    };
    fetchPlayersData();

    return () => (isMounted = false);
  }, [player1_id, player2_id]);

  console.log(playersData);

  const playersPoints = [0, 0];
  const playersBox = [];

  if (playersData) {
    // get points for each player
    for (let i = 0; i < 2; i++) {
      for (const key in playerAttributesInfo.statsDescriptions) {
        if (['name', 'position', 'team'].includes(key)) continue;
        if (parseFloat(playersData[i][key]) >= parseFloat(playersData[i ^ 1][key])) {
          if (key !== 'personal_fouls') playersPoints[i]++;
        }
      }
    }

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

          <InfoBox
            key='rank'
            description='Point obtained from each better stats'
            data={'Comparison points ' + playersPoints[i]}
            color={playersPoints[i] >= playersPoints[i ^ 1] ? 'back-green' : 'back-red'}
            size='full'
          />

          <ComparePlayersStatsList
            players_data={playersData}
            player_id={i}
            descriptions={playerAttributesInfo.statsDescriptions}
            showFull={showFull}
          />
        </div>
      );
    }
  }

  return (
    <div className='compare'>
      <div className='compareBox'>
        {playersBox[0]}
        <h1>Chart</h1> {playersBox[1]}
      </div>
      <button onClick={() => setShowFull(!showFull)}>
        {!showFull ? 'Show more' : 'Show less'}
      </button>
    </div>
  );
};

export default ComparasionResult;
