import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TeamCard from './TeamCard/TeamCard';

import './Team.css';
import Pagination from '../Pagination/Pagination';
import Filters from '../Filters/Filters';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [teamsPerPage] = useState(9);

  const [possibleOrderByKeys, setPossibleOrderByKeys] = useState([]);

  const [search, setSearch] = useState('');
  const [orderByVal, setOrderByVal] = useState('wins');
  const [order, setOrder] = useState('desc');

  useEffect(() => {
    const fetchTeams = async () => {
      setLoading(true);
      let filterString = '';
      filterString = `?search=${search}&order_by=${orderByVal}&order=${order}`;
      console.log(filterString);
      const response = await axios.get('/api/teams' + filterString);
      setTeams(response.data.data);
      setLoading(false);
    };

    fetchTeams();
  }, [search, orderByVal, order]);

  const indexOfLastTeam = currentPage * teamsPerPage;
  const indexOfFirstTeam = indexOfLastTeam - teamsPerPage;
  const currentTeams = teams.slice(indexOfFirstTeam, indexOfLastTeam);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    const fetchPossibleOrderByKeys = async () => {
      const response = await axios.get('/api/teams/possibleOrderByKeys');
      setPossibleOrderByKeys(response.data.data);
    };
    fetchPossibleOrderByKeys();
  }, []);

  const renderTeams = () => {
    if (loading) {
      return <h1>Loading...</h1>;
    } else {
      return (
        <>
          {currentTeams.map((team) => {
            return <TeamCard key={team.team_id} {...team} />;
          })}
        </>
      );
    }
  };

  return (
    <div>
      <Filters
        possibleOrderByKeys={possibleOrderByKeys}
        search={search}
        setSearch={setSearch}
        orderByVal={orderByVal}
        setOrderByVal={setOrderByVal}
        order={order}
        setOrder={setOrder}
      />
      <div id='teamsBox'>{renderTeams()}</div>
      <Pagination
        itensPerPage={teamsPerPage}
        totalItens={teams.length}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
};

export default Teams;
