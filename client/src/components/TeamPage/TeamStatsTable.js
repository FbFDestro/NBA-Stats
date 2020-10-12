import React, { useState, useEffect } from 'react';
import axios from 'axios';

const tableReducedLines = 15;

const TeamStatsTable = ({ team_id }) => {
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

  const [showFull, setShowFull] = useState(false);

  let tableResult = null;
  const teamStatsRows = [];
  if (teamData) {
    let countLines = 0;
    for (const data in teamData) {
      if (!showFull && countLines++ > tableReducedLines) break;

      if (data.startsWith('opponent') || data === 'name' || data === 'team_id') continue;

      const teamValue = teamData[data];
      const opponentValue = teamData['opponent_stat_' + data];

      // set color
      let teamColor = teamValue >= opponentValue;
      if (teamAttributesInfo.smallIsBetter.includes(data)) {
        teamColor ^= 1;
      }
      let opponentColor = !teamColor ? 'red' : '';
      teamColor = teamColor ? 'green' : '';

      // fields that uses both columns (team and opponent)
      const isSingleData = ['possessions', 'games'].includes(data);

      teamStatsRows.push(
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
      <>
        <table className='teamDetails'>
          <thead>
            <tr>
              <th>Team stats</th>
              <th>{teamData['name']}</th>
              <th>Opponents</th>
            </tr>
          </thead>
          <tbody>{teamStatsRows}</tbody>
        </table>
        <button
          className='btnShowMore'
          onClick={() => {
            setShowFull(!showFull);
          }}
        >
          {showFull ? 'Show less' : 'Show more'}
        </button>
      </>
    );
  }

  return tableResult;
};

export default TeamStatsTable;
