import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import millify from "millify";
import { LineChart, Loading, ErrorMessage } from "../../index";
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from "../../../store/apis/cryptoApi";

const CryptoDetails = () => {
  //api call
  const {
    data: cryptoDetail,
    isFetching: isCryptoDetailFetching,
    refetch: refetchCryptoDetail,
  } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory, refetch: refetchCoinHistory } =
    useGetCryptoHistoryQuery({ coinId, timeperiod });

  //router
  const { coinId } = useParams();

  //states
  const [timeperiod, setTimeperiod] = useState("30d");

  //utilities
  const cryptoDetails = cryptoDetail?.data?.coin;
  let stats;
  let genericStats;
  const cryptoName = cryptoDetails?.name;
  const cryptoSlug = cryptoDetails?.slug;
  const cryptoDesc = cryptoDetails?.description;
  const time = ["3h", "24h", "7d", "30d", "3m", "1y", "3y", "5y"];

  if (cryptoDetails) {
    stats = [
      {
        title: "Price to USD",
        value: `$ ${cryptoDetails.price && millify(cryptoDetails.price)}`,
        icon: <DollarCircleOutlined />,
      },
      { title: "Rank", value: cryptoDetails.rank, icon: <NumberOutlined /> },
      {
        title: "24h Volume",
        value: `$ ${cryptoDetails.volume && millify(cryptoDetails.volume)}`,
        icon: <ThunderboltOutlined />,
      },
      {
        title: "Market Cap",
        value: `$ ${
          cryptoDetails.marketCap && millify(cryptoDetails.marketCap)
        }`,
        icon: <DollarCircleOutlined />,
      },
      {
        title: "All-time-high(daily avg.)",
        value: `$ ${millify(cryptoDetails.allTimeHigh.price)}`,
        icon: <TrophyOutlined />,
      },
    ];

    genericStats = [
      {
        title: "Number of Markets",
        value: cryptoDetails.numberOfMarkets,
        icon: <FundOutlined />,
      },
      {
        title: "Number of Exchanges",
        value: cryptoDetails.numberOfExchanges,
        icon: <MoneyCollectOutlined />,
      },
      {
        title: "Approved Supply",
        value: cryptoDetails.approvedSupply ? (
          <CheckOutlined />
        ) : (
          <StopOutlined />
        ),
        icon: <ExclamationCircleOutlined />,
      },
      {
        title: "Total Supply",
        value: `$ ${millify(cryptoDetails.totalSupply)}`,
        icon: <ExclamationCircleOutlined />,
      },
      {
        title: "Circulating Supply",
        value: `$ ${millify(cryptoDetails.circulatingSupply)}`,
        icon: <ExclamationCircleOutlined />,
      },
    ];
  }

  //inject html
  function createMarkup() {
    return { __html: cryptoDesc };
  }

  //conditional rendering
  if (isCryptoDetailFetching) return <Loading />;
  else if (!cryptoDetail?.data)
    return (
      <ErrorMessage
        refetchAction={() => {
          refetchCryptoDetail();
          refetchCoinHistory();
        }}
      >
        {" "}
        Failed to get the Cryptocurrency! try to refetch.
      </ErrorMessage>
    );

  return (
    <section className="cryptoDetails-container">
      <div className="cryptoDetails-header">
        <h2>
          {cryptoName} ({cryptoSlug}) Price
        </h2>
        <p>
          {cryptoName} live price in US Dollar (USD). View value statistics,
          market cap and supply.
        </p>
      </div>
      <div className="cryptoDetails-info">
        <select
          onChange={(value) => setTimeperiod(value.target.value)}
          placeholder="Select TimePriod"
        >
          {time.map((t) => (
            <option value={t}>{t}</option>
          ))}
        </select>
        <LineChart
          coinHistory={coinHistory}
          currentPrice={millify(cryptoDetails.price)}
          coinName={cryptoDetails.name}
        />
        <div className="cryptoDetails-stats">
          <div className="coin-stats">
            <h3>{cryptoName} Value Statistics</h3>
            <p>
              An overview showing the statistics of {cryptoName}, such as the
              base and quote currency, the rank, and trading volume.
            </p>
            <div className="stats-list">
              {stats?.map(({ icon, title, value }) => (
                <div className="single-stat">
                  <div className="single-stat-info">
                    <i>{icon}</i> <p>{title}</p>
                  </div>
                  <b>{value}</b>
                </div>
              ))}
            </div>
          </div>
          <div className="other-stats">
            <h3>Other Stats Info</h3>
            <p>
              An overview showing the statistics of {cryptoName}, such as the
              base and quote currency, the rank, and trading volume.
            </p>
            <div className="stats-list">
              {genericStats?.map(({ icon, title, value }) => (
                <div className="single-stat">
                  <div className="single-stat-info">
                    <i>{icon}</i> <p>{title}</p>
                  </div>
                  <b>{value}</b>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="extra-info">
          <div className="coin-desc">
            <h3> What is {cryptoName}?</h3>
            <div dangerouslySetInnerHTML={createMarkup()} />
          </div>
          <div className="coin-links">
            <h3>{cryptoName} Links</h3>
            <div className="links">
              {cryptoDetails?.links?.map((link) => (
                <div className="single-link">
                  <b>{link.type}</b>
                  <a href={link.url} target="_blank" rel="noreferrer">
                    {link.name}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CryptoDetails;
