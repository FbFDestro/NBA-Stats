import React from 'react';
import { Link } from 'react-router-dom';
import InfoBox from './../../InfoBox/InfoBox';

import './TeamCard.css';

const TeamCard = (props) => {
  return (
    <div className='teamCard'>
      <div className='teamCardHeader'>
        <img src={props.logo_url} alt={props.name + ' logo'} />
        <h2>{props.name}</h2>
      </div>
      <div className='teamCardContent'>
        <InfoBox
          smallDescription='Wins'
          description='Number of wins'
          data={props.wins}
          color='green'
        />
        <InfoBox
          smallDescription='Losses'
          description='Number of losses'
          data={props.losses}
          color='red'
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
          color={props.points_per_game_difference > 0 ? 'green' : 'red'}
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
