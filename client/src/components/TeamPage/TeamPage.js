import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

/*
  const [pointsOnTeam, setPointsOnTeam] = useState([]);
  useEffect(() => {
    let isMounted = true;
    const fetchPossibleOrderByKeys = async () => {
      const response = await axios.get(`/api/players/pointsPerTeam?team_id=1`);
      if (isMounted) {
        setPointsOnTeam(response.data.data);
      }
    };
    fetchPossibleOrderByKeys();

    return () => (isMounted = false);
  }, []);
  */

const TeamPage = () => {
  const { team_id } = useParams();

  const [teamAttributesInfo, setTeamAttributesInfo] = useState({});
  useEffect(() => {
    let isMounted = true;
    const fetchAttributesInfo = async () => {
      const response = await axios.get('/api/teams/attributesInfo');
      if (isMounted) {
        setTeamAttributesInfo(response.data.data);
      }
    };
    fetchAttributesInfo();

    return () => (isMounted = false);
  }, []);

  const [teamData, setTeamData] = useState({});
  useEffect(() => {
    let isMounted = true;
    const fetchTeamData = async () => {
      const response = await axios.get('/api/teams/stats/' + team_id);
      if (isMounted) {
        setTeamData(response.data.data);
      }
    };
    fetchTeamData();

    return () => (isMounted = false);
  }, [team_id]);

  const teamList = [];
  for (const data in teamData) {
    if (data.startsWith('opponent') || data === 'name' || data === 'team_id') continue;

    const teamValue = teamData[data];
    const opponentValue = teamData['opponent_stat_' + data];

    let teamColor = teamValue >= opponentValue ? 'green' : 'red';
    let opponentColor = teamValue <= opponentValue ? 'green' : 'red';

    if (teamAttributesInfo.smallIsBetter.includes(data)) {
      [teamColor, opponentColor] = [opponentColor, teamColor];
    }

    const isSingleData = ['possessions', 'games'].includes(data);

    teamList.push(
      <tr key={data}>
        <td className='description'>{teamAttributesInfo.descriptions[data]}</td>
        <td className={`value ${isSingleData ? 'noRightBorder' : teamColor}`}>
          {teamData[data]}
        </td>
        <td className={`opponentValue ${isSingleData ? 'noLeftBorder' : opponentColor}`}>
          {!isSingleData ? teamData['opponent_stat_' + data] : null}
        </td>
      </tr>
    );
  }

  return (
    <div>
      <h1>{team_id}</h1>
      <table className='teamDetails'>
        <thead>
          <tr>
            <th></th>
            <th>{teamData['name']}</th>
            <th>Opponents</th>
          </tr>
        </thead>
        <tbody>{teamList}</tbody>
      </table>
    </div>
  );
};

export default TeamPage;
