import React, { useState } from "react";
import NewsCard from "../sub/NewsCard";

import { useGetCryptoNewsQuery } from "../../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../../services/cryptoApi";
import Loading from "../sub/Loading";

const News = ({ number }) => {
  const numberOfCryptos = number ? number : 12;

  const [newsCategory, setNewsCategory] = useState("cryptoCurrency");
  const { data: cryptos, isFetching } = useGetCryptosQuery(10);

  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory,
    count: numberOfCryptos,
  });
  if (!cryptoNews?.value) return <Loading />;
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
