import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './ListPage.css';
import Pagination from '../Pagination/Pagination';
import Filters from '../Filters/Filters';
import ItemCard from '../ItemCard/ItemCard';

const ListPage = ({ page, item_id, itensPerPage, cardInfo }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(itensPerPage);

  const [possibleOrderByKeys, setPossibleOrderByKeys] = useState([]);

  const [search, setSearch] = useState('');
  const [orderByVal, setOrderByVal] = useState('');
  const [order, setOrder] = useState('desc');

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      let filterString = '';
      filterString = `?search=${search}&order_by=${orderByVal}&order=${order}`;
      console.log(filterString);
      const response = await axios.get('/api/' + page + filterString);
      setItems(response.data.data);
      setLoading(false);
    };

    fetchItems();
  }, [search, orderByVal, order, page]);

  const indexOfLastTeam = currentPage * itemsPerPage;
  const indexOfFirstTeam = indexOfLastTeam - itemsPerPage;
  const currentItems = items.slice(indexOfFirstTeam, indexOfLastTeam);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    const fetchPossibleOrderByKeys = async () => {
      const response = await axios.get(`/api/${page}/possibleOrderByKeys`);
      setPossibleOrderByKeys(response.data.data);
    };
    fetchPossibleOrderByKeys();
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
                link={`${page}/${item[item_id]}`}
                logo={item[cardInfo.logo_key]}
                name={item['name']}
                infoboxItems={cardInfo.infobox}
                data={item}
              />
            );
          })}
        </>
      );
    }
  };

  return (
    <div>
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
