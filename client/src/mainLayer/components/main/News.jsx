import React, { useState } from "react";
import { useGetCryptoNewsQuery } from "store/apis/cryptoNewsApi";
import { useGetCryptosQuery } from "store/apis/cryptoApi";
import {Loading,ErrorMessage,NewsCard} from "mainLayer/index";


const News = ({ number }) => {
  
  //states
  const [newsCategory, setNewsCategory] = useState("cryptocurrency");
  
  //api call
  const numberOfCryptos = number ? number : 12;
  const {
    data: cryptos,
    isFetching: isCryptosFetching,
    isError:isCryptosError,
    error:cryptosError,
    refetch: refetchCryptos,
  } = useGetCryptosQuery(10);
  const {
    data: cryptoNews,
    isFetching: isCryptoNewsFetching,
    isError:isCryptoNewsError,
    error:CryptoNewsError,
    refetch: refetchCryptoNews,
  } = useGetCryptoNewsQuery({
    newsCategory,
    count: numberOfCryptos,
  });

  //conditional rendering
  if (isCryptoNewsFetching || isCryptosFetching) return <Loading />;
  if (isCryptosError||cryptosError){
    return (
      <ErrorMessage refetchAction={refetchCryptos}>
      Falied to get News category! try to refetch.
      </ErrorMessage>
    )
  }
  if (isCryptoNewsError||CryptoNewsError){
    return (
      <ErrorMessage refetchAction={refetchCryptoNews}>
        Falied to get News! try to refetch.
      </ErrorMessage>
    )
  }

  return (
    <section className="news-wrapper">
      {!number && (
        <div role='category-bar' className="news-category">
          <select
            onChange={(e) => setNewsCategory(e.target.value)}
            value={newsCategory}
          >
            <option id='meme' value="cryptocurrency">Cryptocurrency</option>
            {cryptos?.data?.coins.map((crypto) => (
              <option value={`${crypto.name}`}>{crypto.name}</option>
            ))}
          </select>
        </div>
      )}
      {cryptoNews?.value?.length === 0 ? (
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
          {cryptoNews?.value?.map((news, i) => (
            <NewsCard {...news} key={i} />
          ))}
        </div>
      )}
    </section>
  );
};

export default News;
