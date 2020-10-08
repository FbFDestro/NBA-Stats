import React from 'react';
import './InfoBox.css';

const InfoBox = (props) => {
  let { data, color } = props;
  if (props.fixed && props.fixed > 0) {
    data = props.data.toFixed(props.fixed);
  }
  if (color === 'positive_green') {
    color = data > 0 ? 'green' : 'red';
  }
  return (
    <div className={`btn tooltip ${color}`}>
      <span className='infoBoxSmallDescription'>{props.smallDescription}</span>
      <span className='infoBoxData'>{data}</span>
      <span className='infoBoxFullDescription'>{props.description}</span>
    </div>
  );
};

export default InfoBox;
