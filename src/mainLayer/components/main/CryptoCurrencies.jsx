import React, { useState, useEffect,useRef } from "react";
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
    isError:isCryptosListError,
    error:cryptosListError
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
  else if (isCryptosListError||cryptosListError)
    return (
      <ErrorMessage refetchAction={refetchCryptosList}>
        {" "}
        Failed to get Cryptocurrencies! try to refetch.
      </ErrorMessage>
    );

  return (
    <>
      <section className="coins-container">
        {numberOfCryptos>10 && (
          <div className="search-coins">
            <input
              type="text"
              role='crypto-searchbar'
              placeholder="Search"
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        )}
        {searchedCryptos?.length === 0 && (
          <ErrorMessage>No match coin found!</ErrorMessage>
        )}
        <div className="coins">
          {cryptos?.length !== 0 &&
            cryptos?.map((crypto) => {
              const isFav = favCryptos?.find(
                (favCrypto) => favCrypto.name === crypto.name
              );
              return <CryptoCard key={crypto.uuid} isFav={isFav} {...crypto} />;
            })}
        </div>
        {numberOfCryptos > 10 && searchText === "" && paginate}
      </section>
    </>
  );
};

export default Cryptocurrencies;
