import React from 'react';
import { useParams } from 'react-router-dom';
import StatsTable from './StatsTable';
import TeamInfo from './TeamInfo';
import ListPage from '../ListPage/ListPage';
import cardInfo from '../Players/cardInfo';

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
      <div className='test'>
        <StatsTable team_id={team_id} />
        <ListPage
          listTitle='Team players'
          page='players'
          individualLink='player'
          item_id='player_id'
          itensPerPage='20'
          specificGroupId={team_id}
          cardInfo={cardInfo}
        />
      </div>
    </>
  );
};

export default TeamPage;
