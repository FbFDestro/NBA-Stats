import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from '../Pagination/Pagination';

const ItemsSelection = ({ itemsId, setItemsId, page, item_idKey }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(40);

  const [search, setSearch] = useState('');

  useEffect(() => {
    let isMounted = true;
    const fetchItems = async () => {
      setLoading(true);
      let filterString = '';
      filterString = `?search=${search}`;
      const response = await axios.get(`/api/${page}/basicInfoList${filterString}`);
      if (isMounted) {
        setItems(response.data.data);
        setLoading(false);
      }
    };
    fetchItems();

    return () => (isMounted = false);
  }, [search]);

  const indexOfLastTeam = currentPage * itemsPerPage;
  const indexOfFirstTeam = indexOfLastTeam - itemsPerPage;
  const currentItems = items.slice(indexOfFirstTeam, indexOfLastTeam);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [localSearchStr, setLocalSearchStr] = useState(search);

  const handleSearch = () => {
    setSearch(localSearchStr);
  };

  const [selectedItemsData, setSelectedItemsData] = useState([null, null]);

  const handleSelection = (item) => {
    if (itemsId.length === 2) {
      if (itemsId[0] === null) {
        setItemsId([item[item_idKey], null]);
        setSelectedItemsData([item, null]);
      } else if (itemsId[1] === null && item[item_idKey] !== itemsId[0]) {
        setItemsId([itemsId[0], item[item_idKey]]);
        setSelectedItemsData([selectedItemsData[0], item]);
      }
    }
  };

  const handleUnselection = (id) => {
    if (itemsId[0] === id) {
      setItemsId([itemsId[1], null]);
      setSelectedItemsData([selectedItemsData[1], null]);
    } else if (itemsId[1] === id) {
      setItemsId([itemsId[0], null]);
      setSelectedItemsData([selectedItemsData[0], null]);
    }
  };

  const selectedItems = selectedItemsData.map((item) => {
    if (item === null) return null;
    return (
      <div
        className='selectItem'
        key={item[item_idKey]}
        onClick={() => handleUnselection(item[item_idKey])}
      >
        <img src={item.photo_url} alt={item.name} />
        <span className='itemName'>{item.name}</span>
        <img className='deleteImg' src='/media/delete.png' alt={item.name} />
      </div>
    );
  });

  const itemsList = currentItems.map((item) => {
    return (
      <div
        className='selectItem'
        key={item[item_idKey]}
        onClick={() => {
          handleSelection(item);
        }}
      >
        <img src={item.photo_url} alt={item.name} />{' '}
        <span className='itemName'>{item.name}</span>
      </div>
    );
  });

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {itemsId[1] === null ? (
            <>
              <div id='searchBox'>
                <input
                  type='text'
                  className='searchInput'
                  placeholder='Search by name'
                  value={localSearchStr}
                  onChange={(e) => setLocalSearchStr(e.target.value)}
                />
                <input type='submit' value='Search' onClick={handleSearch} />
              </div>
            </>
          ) : null}

          {itemsId[0] !== null ? (
            <div className='selectedItemsBox'>{selectedItems}</div>
          ) : null}

          {itemsId[1] === null ? (
            <>
              <div className='selectItemBox'>{itemsList}</div>
              <Pagination
                itensPerPage={itemsPerPage}
                totalItens={items.length}
                currentPage={currentPage}
                paginate={paginate}
              />
            </>
          ) : null}
        </>
      )}
    </div>
  );
};

export default ItemsSelection;
