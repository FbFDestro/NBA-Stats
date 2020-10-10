import React from 'react';
import { useParams } from 'react-router-dom';
import StatsTable from './StatsTable';
import TeamInfo from './TeamInfo';
import ListPage from '../ListPage/ListPage';
import cardInfo from '../Players/cardInfo';

import PlayerCharts from './PlayerCharts';

import './TeamPage.css';

const TeamPage = () => {
  const { team_id } = useParams();

  return (
    <>
      <TeamInfo team_id={team_id} />
      <div id='teamStatsBox'>
        <StatsTable team_id={team_id} />
        <div className='chartsBox'>
          <PlayerCharts team_id={team_id} />
        </div>
      </div>
      <ListPage
        listTitle='Team players'
        page='players'
        individualLink='player'
        item_id='player_id'
        itensPerPage='6'
        specificGroupId={team_id}
        cardInfo={cardInfo}
        compact='true'
      />
    </>
  );
};

export default TeamPage;
