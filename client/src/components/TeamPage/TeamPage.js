import React from 'react';
import { useParams } from 'react-router-dom';
import StatsTable from './StatsTable';
import TeamInfo from './TeamInfo';

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

  return (
    <>
      <TeamInfo team_id={team_id} />
      <StatsTable team_id={team_id} />
    </>
  );
};

export default TeamPage;
