import React, { useState } from "react";
import NewsCard from "../sub/NewsCard";

import { useGetCryptoNewsQuery } from "../../../assets/services/cryptoNewsApi";
import { useGetCryptosQuery } from "../../../assets/services/cryptoApi";
import Loading from "../sub/Loading";
import ErrorMessage from '../sub/ErrorMessage'

const News = ({ number }) => {
  const numberOfCryptos = number ? number : 12;

  const [newsCategory, setNewsCategory] = useState("cryptoCurrency");
  const { data: cryptos, isFetching:cryptosFetching } = useGetCryptosQuery(10);

  const { data: cryptoNews,isFetching:cryptoNewsFetching } = useGetCryptoNewsQuery({
    newsCategory,
    count: numberOfCryptos,
  });
  if(cryptoNewsFetching||cryptosFetching)  return <Loading />
    if(!cryptoNews?.value||!cryptos?.data)  return <ErrorMessage>You may have no internet connection! check it and refresh.</ErrorMessage>
  
  return (
    <section className="news-wrapper">
      {!number && (
        <div className="news-category">
          <select
            onChange={(e) => setNewsCategory(e.target.value)}
            value={newsCategory}
          >
            <option value="cryptocurrency">Cryptocurrency</option>
            {cryptos?.data?.coins.map((crypto) => (
              <option value={crypto.name}>{crypto.name}</option>
            ))}
          </select>
        </div>
      )}
      <div className="news-container">
        {cryptoNews.value.map((news, i) => (
          <NewsCard {...news} key={i} />
        ))}
      </div>
    </section>
  );
};

export default News;
