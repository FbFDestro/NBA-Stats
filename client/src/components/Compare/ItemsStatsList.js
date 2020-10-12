import React from 'react';
import InfoBox from '../InfoBox/InfoBox';

const showNumber = 15;

const ItemsStatsList = ({
  items_data,
  item_id,
  descriptions,
  showFull,
  skipList,
  inverted,
}) => {
  const statsList = Object.keys(descriptions).map((description) => {
    if (skipList.includes(description)) return null;

    let color =
      parseFloat(items_data[item_id][description]) >=
      parseFloat(items_data[item_id ^ 1][description])
        ? 'green'
        : 'red';

    //invert color
    if (inverted.includes(description)) {
      color = color === 'green' ? 'red' : 'green';
    }

    return (
      <InfoBox
        key={description}
        smallDescription={descriptions[description]}
        description={descriptions[description]}
        data={items_data[item_id][description]}
        color={color}
        size='full'
      />
    );
  });

  return <>{!showFull ? statsList.slice(0, showNumber) : statsList}</>;
};

export default ItemsStatsList;
