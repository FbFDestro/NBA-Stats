import React from 'react';
import './InfoBox.css';

const InfoBox = (props) => {
  return (
    <div className={`btn tooltip ${props.color}`}>
      <span className='infoBoxSmallDescription'>{props.smallDescription}</span>
      <span className='infoBoxData'>{props.data}</span>
      <span className='infoBoxFullDescription'>{props.description}</span>
    </div>
  );
};

export default InfoBox;
