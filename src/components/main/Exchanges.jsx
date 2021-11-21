import React, { useState, useEffect } from "react";
import { useGetExchangesQuery } from "../../services/cryptoApi";
import {ExchangeDesc,Loading} from '../../components'


const Exchanges = () => {
  const { data, isFetching } = useGetExchangesQuery();
  const [exchanges, setExchagnes] = useState([]);
 
  useEffect(() => setExchagnes(data?.data.exchanges), [data]);

console.log(data);

  if (isFetching) return <Loading />;
 
  return (
    <table>
      <thead>
        <tr>
          <th>Exchanges</th>
          <th>24h Trade Volume</th>
          <th>Markets</th>
          <th>Change</th>
        </tr>
      </thead>
      <tbody >
        {exchanges?.map((exchange) => (
            <ExchangeDesc key={exchange.id} {...exchange} />
          )
        )}
      </tbody>
    </table>
  );
};

export default Exchanges;
