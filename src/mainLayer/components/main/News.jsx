import React, { useState } from "react";
import NewsCard from "../sub/NewsCard";
import { useGetCryptoNewsQuery } from "../../../store/apis/cryptoNewsApi";
import { useGetCryptosQuery } from "../../../store/apis/cryptoApi";
import Loading from "../sub/Loading";
import ErrorMessage from "../sub/ErrorMessage";

const News = ({ number }) => {
  
  //states
  const [newsCategory, setNewsCategory] = useState("cryptocurrency");
  
  //api call
  const numberOfCryptos = number ? number : 12;
  const {
    data: cryptos,
    isFetching: cryptosFetching,
    refetch: refetchCryptos,
  } = useGetCryptosQuery(10);
  const {
    data: cryptoNews,
    isFetching: cryptoNewsFetching,
    refetch: refetchCryptoNews,
  } = useGetCryptoNewsQuery({
    newsCategory,
    count: numberOfCryptos,
  });


  //conditional rendering
  if (cryptoNewsFetching || cryptosFetching) return <Loading />;
  if (!cryptos?.data)
    return (
      <ErrorMessage refetchAction={refetchCryptos}>
        Falied to get News category! try to refetch.
      </ErrorMessage>
    );
  if (!cryptoNews?.value)
    return (
      <ErrorMessage refetchAction={refetchCryptoNews}>
        Falied to get News! try to refetch.
      </ErrorMessage>
    );

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
              <option value={`${crypto.name}`}>{crypto.name}</option>
            ))}
          </select>
        </div>
      )}
      {cryptoNews.value.length === 0 ? (
        <h2
          style={{
            textAlign: "center",
            marginTop: "1.5rem",
            color: "hsl(0, 0%, 81%)",
          }}
        >
          No news found! you can change the topic.
        </h2>
      ) : (
        <div className="news-container">
          {cryptoNews.value.map((news, i) => (
            <NewsCard {...news} key={i} />
          ))}
        </div>
      )}
    </section>
  );
};

export default News;
