import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StatsTable = ({ team_id }) => {
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

  const [teamData, setTeamData] = useState(null);
  useEffect(() => {
    let isMounted = true;
    const fetchTeamData = async () => {
      const response = await axios.get('/api/teams/stats/' + team_id);
      if (isMounted) {
        if (response.data.data) setTeamData(response.data.data);
      }
    };
    fetchTeamData();

    return () => (isMounted = false);
  }, [team_id]);

  let tableResult = null;

  const teamList = [];
  if (teamData) {
    for (const data in teamData) {
      if (data.startsWith('opponent') || data === 'name' || data === 'team_id') continue;

      const teamValue = teamData[data];
      const opponentValue = teamData['opponent_stat_' + data];

      let teamColor = teamValue >= opponentValue ? 'green' : 'red';
      let opponentColor = teamValue <= opponentValue ? 'green' : 'red';

      if (teamAttributesInfo.smallIsBetter.includes(data)) {
        [teamColor, opponentColor] = [opponentColor, teamColor];
      }
      if (teamColor === 'red') {
      }

      const isSingleData = ['possessions', 'games'].includes(data);

      teamList.push(
        <tr key={data}>
          <td className='description'>{teamAttributesInfo.descriptions[data]}</td>
          <td className={`value ${isSingleData ? 'noRightBorder' : teamColor}`}>
            {teamData[data]}
          </td>
          <td
            className={`opponentValue ${isSingleData ? 'noLeftBorder' : opponentColor}`}
          >
            {!isSingleData ? teamData['opponent_stat_' + data] : null}
          </td>
        </tr>
      );
    }

    tableResult = (
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
    );
  }

  return tableResult;
};

export default StatsTable;
