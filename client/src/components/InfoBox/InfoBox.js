import React from 'react';
import { Link } from 'react-router-dom';
import './InfoBox.css';

const InfoBox = (props) => {
  let { data, color, size } = props;
  if (props.fixed && props.fixed > 0) {
    data = props.data.toFixed(props.fixed);
  }
  if (color === 'positive_green') {
    color = data > 0 ? 'green' : 'red';
  } else if (color === undefined) {
    color = '';
  }

  if (!size) size = '';

  const box = (
    <div key={props.smallDescription} className={`btn tooltip ${color} ${size}`}>
      <span className='infoBoxSmallDescription'>
        {props.image ? (
          <img src={props.image} alt={props.description} />
        ) : (
          props.smallDescription
        )}
      </span>
      <span className='infoBoxData'>{data}</span>
      {!props.link ? (
        <span className='infoBoxFullDescription'>{props.description}</span>
      ) : null}
    </div>
  );

  return props.link ? (
    <Link to={props.link} title={props.description}>
      {box}
    </Link>
  ) : (
    box
  );
};

export default InfoBox;
