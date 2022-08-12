import { Card, Col, Input, Row } from 'antd';
import millify from 'millify';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useGetCryptosQuery } from '../services/cryptoApi'
import Loader from './Loader';

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [ cryptos, setCryptos ] = useState([]);
  const [ searchTerm , setSearchTerm ] = useState('');
  // console.log(cryptos)

  useEffect(() => {

    // console.log('useEffec')
    console.log(cryptosList);
    // console.log(cryptos)

    const filterData = cryptosList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()))
    // const sentence = 'foxfoxfox'; 
    // const word = '';
    // console.log(`${sentence.includes(word)}`);
    // true
    // 空字串也算

    setCryptos(filterData);

  }, [ cryptosList, searchTerm ]);

  if (isFetching) return <Loader />;

  return (
    <>
    {!simplified && (
      <div className='search-crypto'>
        <Input placeholder='Seatch Cryptocurrency' onChange={(e) => setSearchTerm(e.target.value)}/>
      </div>
    )}
      <Row gutter={[32,32]} className="crypto-card-container">
        {/* ?.不加的話會出error undefined */}
        {cryptos?.map((currency) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.uuid}>
            <Link to={`/crypto/${currency.uuid}`}>
                <Card
                  title={`${currency.rank}. ${currency.name}`}
                  extra={<img className='crypto-image' src={currency.iconUrl} />}
                  hoverable
                >
                  <p>Price: {millify(currency.price)}</p>
                  <p>Market Cap: {millify(currency.marketCap)}</p>
                  <p>Daily Change: {millify(currency.change)}</p>
                </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Cryptocurrencies