import React from 'react';
import { Link } from 'react-router-dom';
import InfoBox from './../../InfoBox/InfoBox';

import './TeamCard.css';

const TeamCard = () => {
  const props = {
    team_id: 3,
    name: 'Atlanta Hawks',
    logo_url: 'https://upload.wikimedia.org/wikipedia/en/2/24/Atlanta_Hawks_logo.svg',
    wins: 29,
    losses: 53,
    winning_percentage: 0.353658536585366,
    points: '13476.3',
    points_per_game: 164.34512195122,
    opponent_stat_points: '14192.6',
    opponent_points_per_game: 173.080487804878,
    points_per_game_difference: -8.73536585365855,
  };

  return (
    <div className='teamCard'>
      <div className='teamCardHeader'>
        <img src={props.logo_url} alt={props.name + ' logo'} />
        <h2>{props.name}</h2>
      </div>
      <div className='teamCardContent'>
        <InfoBox smallDescription='Wins' description='Number of wins' data={props.wins} />
        <InfoBox
          smallDescription='Losses'
          description='Number of losses'
          data={props.wins}
        />
        <InfoBox
          smallDescription='PCT'
          description='Winning percentage'
          data={props.winning_percentage.toFixed(2)}
        />
        <InfoBox
          smallDescription='PPG'
          description='Points per game'
          data={props.points_per_game.toFixed(1)}
        />
        <InfoBox
          smallDescription='OPPG'
          description='Opponent points per game'
          data={props.opponent_points_per_game.toFixed(1)}
        />
        <InfoBox
          smallDescription='DIFF'
          description='Average point differential'
          data={props.points_per_game_difference.toFixed(1)}
        />
        {/**List of teams information */}
      </div>
      <Link className='teamCardFolder' to={`/team/${props.team_id}`}>
        See more information
      </Link>
    </div>
  );
};

export default TeamCard;
