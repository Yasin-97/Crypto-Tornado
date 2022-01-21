import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  CryptoCard,
  usePagination,
  ErrorMessage,
  Loading,
} from "../../index";
import { useGetCryptosQuery } from "../../../store/apis/cryptoApi";

const Cryptocurrencies = ({ number }) => {
  //api call
  const numberOfCryptos = number ? number : 100;
  const {
    data: cryptosList,
    isFetching: isCryptosListFetching,
    refetch: refetchCryptosList,
  } = useGetCryptosQuery(numberOfCryptos);

  // redux store data
  const favCryptos = useSelector((state) => state.watchlistApi.favCryptos);

  //states
  const [searchedCryptos, setSearchedCryptos] = useState([]);
  const [searchText, setSearchText] = useState("");

  // pagination
  const { setInputData, currentPageData, paginate } = usePagination();

  //handle cryptos on searching
  const cryptos = searchText !== "" ? searchedCryptos : currentPageData;

  //side effects
  useEffect(() => {
    setInputData(cryptosList?.data?.coins);
  }, [cryptosList]);

  useEffect(() => {
    const filteredData = cryptosList?.data?.coins.filter((coin) => {
      const regex = new RegExp(`^${searchText}`, "gi");
      return coin.name.match(regex) || coin.symbol.match(regex);
    });
    setSearchedCryptos(filteredData);
  }, [cryptosList, searchText]);

  //conditional rendering
  if (isCryptosListFetching) return <Loading />;
  else if (!cryptosList?.data)
    return (
      <ErrorMessage refetchAction={refetchCryptosList}>
        {" "}
        Failed to get Cryptocurrencies! try to refetch.
      </ErrorMessage>
    );

  return (
    <>
      <section className="coins-container">
        {!number && (
          <div className="search-coins">
            <input
              type="text"
              placeholder="Search"
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        )}
        {searchedCryptos?.length === 0 && (
          <ErrorMessage>Sorry! no match coin found!</ErrorMessage>
        )}
        <div className="coins">
          {cryptos?.length !== 0 &&
            cryptos?.map((crypto) => {
              const isFav = favCryptos?.find(
                (favCrypto) => favCrypto.name === crypto.name
              );

              return <CryptoCard key={crypto.id} isFav={isFav} {...crypto} />;
            })}
        </div>
        {numberOfCryptos !== 10 && searchText === "" && paginate}
      </section>
    </>
  );
};

export default Cryptocurrencies;
