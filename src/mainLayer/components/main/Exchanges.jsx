import React, { useState, useEffect } from "react";

import { useGetExchangesQuery } from "../../../store/apis/cryptoApi";
import { Exchange, Loading, ErrorMessage } from "../../index";

const Exchanges = () => {
  //api call
  const {
    data: exchangesData,
    isFetching: isExchangesDataFetching,
    refetch: refetchExchangesData,
  } = useGetExchangesQuery();

  //states
  const [exchanges, setExchagnes] = useState([]);

  //side effects
  useEffect(() => setExchagnes(exchangesData?.data.exchanges), [exchangesData]);

  //conditional rendering
  if (isExchangesDataFetching) return <Loading />;
  if (!exchangesData?.data.exchanges)
    return (
      <ErrorMessage refetchAction={refetchExchangesData}>
        {" "}
        Failed to get exchanges! try to refetch.
      </ErrorMessage>
    );

  return (
    <table className="exchange-table">
      <thead>
        <tr>
          <th>Exchanges</th>
          <th>24h Trade Volume</th>
          <th>Markets</th>
          <th>Change</th>
        </tr>
      </thead>
      <tbody>
        {exchanges?.map((exchange) => (
          <Exchange key={exchange.id} {...exchange} />
        ))}
      </tbody>
    </table>
  );
};

export default Exchanges;
