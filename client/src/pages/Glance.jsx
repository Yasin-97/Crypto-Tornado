import React from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { SwapRightOutlined } from "assets/icons";
import { useGetCryptosQuery } from "store/apis/cryptoApi";
import { CryptoCurrencies, News } from "pages";
import { ErrorMessage, Loading } from "components";

const Glance = () => {
  //api call
  const showingCryptos = 10;
  const {
    data: cryptos,
    isFetching: isCryptosFetching,
    refetch: refetchCryptos,
  } = useGetCryptosQuery(showingCryptos);

  //utilitis
  const showingNews = 6;
  const globalStats = cryptos?.data?.stats;

  //conditional rendering
  if (isCryptosFetching) return <Loading />;
  if (!globalStats)
    return (
      <ErrorMessage refetchAction={refetchCryptos}>
        Failed to get data! try to refetch.
      </ErrorMessage>
    );
  return (
    <main className="glance">
      <h2 role="global-crypto-stats" className="heading">
        Global Crypto Stats
      </h2>
      <div className="stats-container">
        <div className="stat">
          <p>Total Cryptocurrencies</p>
          <b>{globalStats.total}</b>
        </div>
        <div className="stat">
          <p>Total Exchanges</p>
          <b>{millify(globalStats.totalExchanges)}</b>
        </div>
        <div className="stat">
          <p>Total Market Cap</p>
          <b>{millify(globalStats.totalMarketCap)}</b>
        </div>
        <div className="stat">
          <p>Total 24h Volume</p>
          <b>{millify(globalStats.total24hVolume)}</b>
        </div>
        <div className="stat">
          <p>Total Markets</p>
          <b>{millify(globalStats.totalMarkets)}</b>
        </div>
      </div>
      <div className="heading-container">
        <h2 role="top-10-cryptocurrencies" className="heading">
          Top 10 Cryptocurrencies
        </h2>

        <Link
          style={{ color: "hsl(43, 100%, 65%)" }}
          role="show-more-cryptos"
          to="/cryptocurrencies"
        >
          <h4 className="show-more">
            Show More <SwapRightOutlined />
          </h4>
        </Link>
      </div>
      <CryptoCurrencies number={showingCryptos} />
      <div className="heading-container">
        <h2 role="top-crypto-news" className="heading">
          Top Crypto News
        </h2>

        <Link role="show-more-news" to="/news">
          <h4 className="show-more">
            Show More <SwapRightOutlined />
          </h4>
        </Link>
      </div>
      <News number={showingNews} />
    </main>
  );
};

export default Glance;
