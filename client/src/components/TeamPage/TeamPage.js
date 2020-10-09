import React from 'react';
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
  let { team_id } = useParams();
  return (
    <div>
      <h1>{team_id}</h1>
    </div>
  );
};

export default TeamPage;
