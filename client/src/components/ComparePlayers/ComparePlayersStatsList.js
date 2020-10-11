import React from 'react';
import InfoBox from '../InfoBox/InfoBox';

const ComparePlayersStatsList = ({ player1_data, player2_data, descriptions }) => {
  const statsList = Object.keys(descriptions).map((description) => {
    if (['name', 'position', 'team'].includes(description)) return null;

    let color =
      parseFloat(player1_data[description]) > parseFloat(player2_data[description])
        ? 'green'
        : 'red';

    //invert color
    if (description === 'personal_fouls') {
      color = color == 'green' ? 'red' : 'green';
    }

    return (
      <InfoBox
        key={description}
        smallDescription={descriptions[description]}
        description={descriptions[description]}
        data={player1_data[description]}
        color={color}
        size='full'
      />
    );
  });

  return <div>{statsList}</div>;
};

export default ComparePlayersStatsList;
