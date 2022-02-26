import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetCryptosQuery } from "../../../store/apis/cryptoApi";
import { ErrorMessage, WatchlistCryptoItem, Loading } from "../../index";

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
console.log('this',cryptosList?.data?.coins);
  //conditional rendering
  if (isCryptosListFetching) return <Loading />;
  if (!cryptosList?.data)
    return (
      <ErrorMessage refetchAction={refetchCryptosList}>
        {" "}
        Failed to get Cryptocurrencies! try to refetch.
      </ErrorMessage>
    );

  if (!userWatchlist || userWatchlist?.length === 0)
    return (
      <h2
        style={{
          textAlign: "center",
          marginTop: "1.5rem",
          color: "hsl(0, 0%, 81%)",
        }}
      >
        {" "}
        No favorite cryptocurrency!
      </h2>
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
