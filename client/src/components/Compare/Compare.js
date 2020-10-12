import React, { useState } from 'react';
import ComparasionResult from './ComparasionResult';
import ItemsSelection from './ItemsSelection';

const Compare = ({ page, skipList, inverted, item_idKey, infoBoxes }) => {
  const [itemsId, setItemsId] = useState([null, null]);

  return (
    <div>
      <h1>Compare two {page}</h1>
      <ItemsSelection
        itemsId={itemsId}
        setItemsId={setItemsId}
        page={page}
        item_idKey={item_idKey}
      />
      {itemsId.length === 2 && itemsId[0] && itemsId[1] ? (
        <ComparasionResult
          page={page}
          itemsId={itemsId}
          infoBoxes={infoBoxes}
          skipList={skipList}
          inverted={inverted}
        />
      ) : null}
    </div>
  );
};

export default Compare;
