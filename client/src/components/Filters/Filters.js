import React, { useState } from 'react';

import './Filters.css';

const Filters = ({
  possibleOrderByKeys,
  search,
  setSearch,
  orderByVal,
  setOrderByVal,
  order,
  setOrder,
}) => {
  const [localSearchStr, setLocalSearchStr] = useState(search);

  const handleSearch = () => {
    setSearch(localSearchStr);
  };

  const handleRadioBtnChange = (e) => {
    console.log(e);
    setOrder(e.target.value);
  };

  return (
    <div id='filterBox'>
      <div id='searchBox'>
        <input
          type='text'
          className='searchInput'
          placeholder='Search'
          value={localSearchStr}
          onChange={(e) => setLocalSearchStr(e.target.value)}
        />
        <input type='submit' value='Search' onClick={handleSearch} />
      </div>

      <div id='orderByBox'>
        <select value={orderByVal} onChange={(e) => setOrderByVal(e.currentTarget.value)}>
          <option key='empty' value=''>
            Order by{' '}
          </option>
          {possibleOrderByKeys.map(({ description, value }) => (
            <option key={value} value={value}>
              {description}
            </option>
          ))}
        </select>

        <div id='radioBtnsBox'>
          <div className='radioBtnOption'>
            <input
              type='radio'
              id='ascending'
              name='order'
              value='asc'
              checked={order === 'asc'}
              onChange={(e) => handleRadioBtnChange(e)}
            />
            <span>Ascending</span>
          </div>

          <div className='radioBtnOption'>
            <input
              type='radio'
              id='descending'
              name='order'
              value='desc'
              checked={order === 'desc'}
              onChange={(e) => handleRadioBtnChange(e)}
            />
            <span>Descending</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
