import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './ListPage.css';
import Pagination from '../Pagination/Pagination';
import Filters from '../Filters/Filters';
import ItemCard from '../ItemCard/ItemCard';

const ListPage = ({
  page,
  individualLink,
  item_id,
  specificGroupId,
  itensPerPage,
  cardInfo,
  listTitle,
  compact,
}) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(itensPerPage);

  const [possibleOrderByKeys, setPossibleOrderByKeys] = useState([]);

  const [search, setSearch] = useState('');
  const [orderByVal, setOrderByVal] = useState('');
  const [order, setOrder] = useState('desc');

  useEffect(() => {
    let isMounted = true;
    const fetchItems = async () => {
      setLoading(true);
      let filterString = '';
      filterString = `?search=${search}&order_by=${orderByVal}&order=${order}`;
      if (specificGroupId) {
        filterString += `&id=${specificGroupId}`;
      }
      const response = await axios.get('/api/' + page + filterString);
      if (isMounted) {
        setItems(response.data.data);
        setLoading(false);
      }
    };
    fetchItems();

    return () => (isMounted = false);
  }, [search, orderByVal, order, page, specificGroupId]);

  const indexOfLastTeam = currentPage * itemsPerPage;
  const indexOfFirstTeam = indexOfLastTeam - itemsPerPage;
  const currentItems = items.slice(indexOfFirstTeam, indexOfLastTeam);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    let isMounted = true;
    const fetchPossibleOrderByKeys = async () => {
      const response = await axios.get(`/api/${page}/possibleOrderByKeys`);
      if (isMounted) {
        setPossibleOrderByKeys(response.data.data);
      }
    };
    fetchPossibleOrderByKeys();

    return () => (isMounted = false);
  }, [page]);

  const renderItems = () => {
    if (loading) {
      return <h1>Loading...</h1>;
    } else {
      return (
        <>
          {currentItems.map((item) => {
            return (
              <ItemCard
                key={item[item_id]}
                link={`/${individualLink}/${item[item_id]}`}
                logo={item[cardInfo.logo_key]}
                name={item['name']}
                infoboxItems={cardInfo.infobox}
                data={item}
                compact={compact ? true : false}
              />
            );
          })}
        </>
      );
    }
  };

  const title = listTitle ? <h1 className='listTitle'>{listTitle}</h1> : null;

  return (
    <div>
      {title}
      <Filters
        possibleOrderByKeys={possibleOrderByKeys}
        search={search}
        setSearch={setSearch}
        orderByVal={orderByVal}
        setOrderByVal={setOrderByVal}
        order={order}
        setOrder={setOrder}
      />
      <div id='itemsBox'>{renderItems()}</div>
      <Pagination
        itensPerPage={itemsPerPage}
        totalItens={items.length}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
};

export default ListPage;
