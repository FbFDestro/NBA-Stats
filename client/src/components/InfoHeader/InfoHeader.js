import React, { useState, useEffect } from 'react';
import axios from 'axios';

import InfoBox from '../InfoBox/InfoBox';
import './InfoHeader.css';

const InfoHeader = ({ data }) => {
  const { page, page_id } = data;
  const [pageInfo, setPageInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    const fetchPageInfo = async () => {
      const response = await axios.get(`/api/${page}/info/${page_id}`);
      if (isMounted) {
        if (response.data.data.length > 0) setPageInfo(response.data.data[0]);
        setIsLoading(false);
      }
    };
    fetchPageInfo();

    return () => (isMounted = false);
  }, [page, page_id]);

  let pageHeaderBox = <h1>Loading...</h1>;
  if (!isLoading && pageInfo) {
    const infoBoxes = data.infoBoxes.map((box) => {
      return (
        <InfoBox
          key={box.dataKey}
          smallDescription={box.smallDescription}
          description={box.description}
          data={pageInfo[box.dataKey]}
          image={box.imageKey ? pageInfo[box.imageKey] : null}
          link={box.linkKey ? box.linkPrefix + pageInfo[box.linkKey] : null}
          bigger='big'
        />
      );
    });

    pageHeaderBox = (
      <div id='titleInfoBox'>
        <div className='logo'>
          <img src={pageInfo[data['logo_url']]} alt={pageInfo[data['name']] + ' logo'} />
          <h2>{pageInfo[data['name']]}</h2>
        </div>

        <div className='infoHeaderBoxes'>{infoBoxes}</div>
      </div>
    );
  } else if (!isLoading) {
    pageHeaderBox = <h1>Not found!</h1>;
  }

  return pageHeaderBox;
};

export default InfoHeader;
