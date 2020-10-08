import React from 'react';
import { Link } from 'react-router-dom';
import InfoBox from '../InfoBox/InfoBox';

import './ItemCard.css';

const ItemCard = ({ link, logo, name, infoboxItems, data }) => {
  const infoBoxes = infoboxItems.map((infobox) => {
    return (
      <InfoBox
        key={infobox.smallDescription}
        smallDescription={infobox.smallDescription}
        description={infobox.description}
        data={data[infobox.dataKey]}
        image={infobox.imageKey ? data[infobox.imageKey] : null}
        link={infobox.linkKey ? infobox.linkPrefix + data[infobox.linkKey] : null}
        color={infobox.color}
        fixed={infobox.fixed}
      />
    );
  });

  return (
    <div className='itemCard'>
      <Link to={link} className='itemCardHeader'>
        <img src={logo} alt={name + ' logo'} />
        <h2>{name}</h2>
      </Link>
      <div className='itemCardContent'>{infoBoxes}</div>
      <Link className='itemCardFooter' to={link}>
        See more information
      </Link>
    </div>
  );
};

export default ItemCard;
