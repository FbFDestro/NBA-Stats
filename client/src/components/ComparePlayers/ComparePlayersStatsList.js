import React from 'react';
import InfoBox from '../InfoBox/InfoBox';

const showNumber = 15;

const ComparePlayersStatsList = ({ players_data, player_id, descriptions, showFull }) => {
  const statsList = Object.keys(descriptions).map((description) => {
    if (['name', 'position', 'team'].includes(description)) return null;

    let color =
      parseFloat(players_data[player_id][description]) >=
      parseFloat(players_data[player_id ^ 1][description])
        ? 'green'
        : 'red';

    //invert color
    if (description === 'personal_fouls') {
      color = color === 'green' ? 'red' : 'green';
    }

    return (
      <InfoBox
        key={description}
        smallDescription={descriptions[description]}
        description={descriptions[description]}
        data={players_data[player_id][description]}
        color={color}
        size='full'
      />
    );
  });

  return <>{!showFull ? statsList.slice(0, showNumber) : statsList}</>;
};

export default ComparePlayersStatsList;
