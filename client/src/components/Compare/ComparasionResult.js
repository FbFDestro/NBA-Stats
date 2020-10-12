import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemCard from '../ItemCard/ItemCard';

import './Compare.css';
import ItemsStatsList from './ItemsStatsList';
import InfoBox from '../InfoBox/InfoBox';
import PlayerCompareChart from './PlayerCompareChart';

const ComparasionResult = ({
  itemsId,
  page,
  skipList,
  inverted,
  item_idKey,
  infoBoxes,
}) => {
  const item1_id = itemsId[0];
  const item2_id = itemsId[1];

  const [itemAttributesInfo, setItemAttributesInfo] = useState({});
  const [showFull, setShowFull] = useState(false);
  useEffect(() => {
    let isMounted = true;
    const fetchAttributesInfo = async () => {
      const response = await axios.get(`/api/${page}/attributesInfo`);
      if (isMounted) {
        setItemAttributesInfo(response.data.data);
      }
    };
    fetchAttributesInfo();

    return () => (isMounted = false);
  }, [page]);

  const [itemsData, setItemsData] = useState(null);
  useEffect(() => {
    let isMounted = true;
    const fetchItemsData = async () => {
      const response = await axios.get(`/api/${page}/compare/${item1_id}/${item2_id}`);
      if (isMounted) {
        if (response.data.data) setItemsData(response.data.data);
      }
    };
    fetchItemsData();

    return () => (isMounted = false);
  }, [page, item1_id, item2_id]);

  const itemsPoints = [0, 0];
  const itemsBox = [];

  if (itemsData) {
    // get points for each item
    for (let i = 0; i < 2; i++) {
      for (const key in itemAttributesInfo.statsDescriptions) {
        if (skipList.includes(key)) continue;
        if (parseFloat(itemsData[i][key]) >= parseFloat(itemsData[i ^ 1][key])) {
          if (!inverted.includes(key)) itemsPoints[i]++;
        } else if (inverted.includes(key)) {
          itemsPoints[i]++;
        }
      }
    }

    for (let i = 0; i < itemsData.length; i++) {
      const item = itemsData[i];
      itemsBox.push(
        <div key={item[item_idKey]} className='itemBoxCompare'>
          <ItemCard
            link={`/${page.slice(0, -1)}/${item[item_idKey]}`}
            logo={item['photo_url'] ? item['photo_url'] : item['logo_url']}
            name={item['name']}
            infoboxItems={infoBoxes}
            data={item}
          />

          <InfoBox
            description='Point obtained from each better stats'
            data={'Comparison points ' + itemsPoints[i]}
            color={itemsPoints[i] >= itemsPoints[i ^ 1] ? 'back-green' : 'back-red'}
            size='full'
          />

          <ItemsStatsList
            key={'statsList' + i}
            items_data={itemsData}
            item_id={i}
            descriptions={itemAttributesInfo.statsDescriptions}
            showFull={showFull}
            skipList={skipList}
            inverted={inverted}
          />
        </div>
      );
    }
  }

  return (
    <div className='compare'>
      <div className='compareBox'>{itemsBox}</div>
      <button onClick={() => setShowFull(!showFull)}>
        {!showFull ? 'Show more' : 'Show less'}
      </button>
      {itemsData && page === 'players' ? (
        <PlayerCompareChart playersData={itemsData} />
      ) : null}
    </div>
  );
};

export default ComparasionResult;
