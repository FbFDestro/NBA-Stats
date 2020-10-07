import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TeamCard from './TeamCard/TeamCard';

import './Team.css';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [teamsPerPage, setTeamsPerPage] = useState(10);

  useEffect(() => {
    const fetchTeams = async () => {
      setLoading(true);
      const response = await axios.get('/api/teams');
      setTeams(response.data.data);
      setLoading(false);
    };

    fetchTeams();
  }, []);

  const renderTeams = () => {
    if (loading) {
      return <h1>Loading...</h1>;
    } else {
      return (
        <>
          {teams.map((team) => {
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
    </div>
  );
};

export default Teams;
