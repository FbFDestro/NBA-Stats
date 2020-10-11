import React from 'react';
import { useParams } from 'react-router-dom';
import TeamStatsTable from './TeamStatsTable';

import InfoHeader from '../InfoHeader/InfoHeader';

import ListPage from '../ListPage/ListPage';
import cardInfo from '../Players/cardInfo';

import PlayerCharts from './PlayerCharts';

import './TeamPage.css';

const TeamPage = () => {
  const { team_id } = useParams();

  const infoHeaderData = {
    page: 'teams',
    page_id: team_id,
    logo_url: 'logo_url',
    name: 'name',
    infoBoxes: [
      { dataKey: 'city', smallDescription: 'City', description: "Team's city" },
      {
        dataKey: 'conference',
        smallDescription: 'Conference',
        description: "Team's conference",
      },
      {
        dataKey: 'division',
        smallDescription: 'Division',
        description: "Team's division",
      },
    ],
  };

  return (
    <>
      {/* <TeamInfo team_id={team_id} /> */}
      <InfoHeader data={infoHeaderData} />
      <div id='teamStatsBox'>
        <TeamStatsTable team_id={team_id} />
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
