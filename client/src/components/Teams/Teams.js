import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TeamCard from './TeamCard/TeamCard';

import './Team.css';
import Pagination from '../Pagination/Pagination';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [teamsPerPage, setTeamsPerPage] = useState(9);

  useEffect(() => {
    const fetchTeams = async () => {
      setLoading(true);
      const response = await axios.get('/api/teams');
      setTeams(response.data.data);
      setLoading(false);
    };

    fetchTeams();
  }, []);

  const indexOfLastTeam = currentPage * teamsPerPage;
  const indexOfFirstTeam = indexOfLastTeam - teamsPerPage;
  const currentTeams = teams.slice(indexOfFirstTeam, indexOfLastTeam);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
      <div id='filtersBox'>
        {/* Filterbox Component that recieves as props functions to act, orderByKeys*/}
      </div>
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
