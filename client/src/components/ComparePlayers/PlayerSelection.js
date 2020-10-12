import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from '../Pagination/Pagination';

const PlayerSelection = ({ playersId, setPlayersId }) => {
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
      const response = await axios.get('/api/players/basicInfoList' + filterString);
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

  const [selectedPlayersData, setSelectedPlayersData] = useState([null, null]);

  const handleSelection = (item) => {
    if (playersId.length === 2) {
      if (playersId[0] === null) {
        setPlayersId([item.player_id, null]);
        setSelectedPlayersData([item, null]);
      } else if (playersId[1] === null && item.player_id !== playersId[0]) {
        setPlayersId([playersId[0], item.player_id]);
        setSelectedPlayersData([selectedPlayersData[0], item]);
      }
    }
  };

  const handleUnselection = (id) => {
    if (playersId[0] === id) {
      setPlayersId([playersId[1], null]);
      setSelectedPlayersData([selectedPlayersData[1], null]);
    } else if (playersId[1] === id) {
      setPlayersId([playersId[0], null]);
      setSelectedPlayersData([selectedPlayersData[0], null]);
    }
  };

  const selectedPlayers = selectedPlayersData.map((item) => {
    if (item === null) return null;
    return (
      <div
        className='selectPlayer'
        key={item.player_id}
        onClick={() => handleUnselection(item.player_id)}
      >
        <img src={item.photo_url} alt={item.name} />
        <span className='playerName'>{item.name}</span>
        <img className='deleteImg' src='/media/delete.png' alt={item.name} />
      </div>
    );
  });

  const playersList = currentItems.map((item) => {
    return (
      <div
        className='selectPlayer'
        key={item.player_id}
        onClick={() => {
          handleSelection(item);
        }}
      >
        <img src={item.photo_url} alt={item.name} />{' '}
        <span className='playerName'>{item.name}</span>
      </div>
    );
  });

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {playersId[1] === null ? (
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

          {playersId[0] !== null ? (
            <div className='selectedPlayersBox'>{selectedPlayers}</div>
          ) : null}

          {playersId[1] === null ? (
            <>
              <div className='selectPlayerBox'>{playersList}</div>
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

export default PlayerSelection;
