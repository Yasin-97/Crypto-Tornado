import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "store/apis/cryptoApi";
import { ErrorMessage, WatchlistCryptoItem, Loading } from "components";

export default function WatchList() {
  //api call
  const {
    data: cryptosList,
    isFetching: isCryptosListFetching,
    refetch: refetchCryptosList,
  } = useGetCryptosQuery(100);

  //redux
  const favCryptos = useSelector((state) => state.watchlistApi.favCryptos);

  //state
  const [userWatchlist, setUserWatchlist] = useState(null);

  //side effects
  useEffect(() => {
    const filteredData = favCryptos?.map((watchlistCoin) => {
      return cryptosList?.data?.coins.find((coin) => {
        if (coin.name === watchlistCoin.name) {
          return coin;
        }
      });
    });
    setUserWatchlist(filteredData);
  }, [cryptosList, favCryptos]);

  //conditional rendering
  if (isCryptosListFetching) return <Loading />;
  if (!cryptosList?.data)
    return (
      <ErrorMessage refetchAction={refetchCryptosList}>
        Failed to get Cryptocurrencies! try to refetch.
      </ErrorMessage>
    );

  if (!userWatchlist || userWatchlist?.length === 0)
    return (
      <div style={{textAlign:'center'}}>
      <ErrorMessage refetchAction={refetchCryptosList}>
        No favorite cryptocurrency!
      </ErrorMessage>
      <Link to="/cryptocurrencies" className="no-crypto-btn">
        Add One
      </Link>
      </div>
    );

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <table className="watchlist-table">
        <thead>
          <tr>
            <th></th>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>24h %</th>
            <th>Market Cap</th>
            <th>24h Volume</th>
          </tr>
        </thead>
        <tbody>
          {cryptosList?.data?.coins?.map((crypto) => {
            const isFav = userWatchlist?.find(
              (favCrypto) => favCrypto?.name === crypto.name
            );
            return isFav ? (
              <WatchlistCryptoItem key={crypto.id} isFav={isFav} {...crypto} dailyVolume={crypto['24hVolume']} />
            ) : null;
          })}
        </tbody>
      </table>
    </div>
  );
}
