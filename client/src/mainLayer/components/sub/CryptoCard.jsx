import React, { useState } from "react";

import { useHistory } from "react-router-dom";
import millify from "millify";
import { StarOutlined, StarFilled, LoadingOutlined } from "@ant-design/icons";
import { Modal,useSetFavoriteItem } from "mainLayer/index";


export default function CryptoCard({
  uuid,
  symbol,
  iconUrl,
  rank,
  name,
  price,
  marketCap,
  change,
  isFav,
}) {

  //routing
  const history = useHistory();

  //custom hook
  const {
    isLoading,
    isFavCrypto,
    isUserExist,
    isFavCryptosFetched,
    adder,
    remover,
  } = useSetFavoriteItem({isFav, uuid, name});

  // state
  const [modal, setModal] = useState(false);

  //functions
  const toggleModal = () => {
    setModal((prev) => !prev);
  };
  const promptCryptoDetail = () => {
    history.push(`/cryptodetails/${uuid}`);
  };

  const promptSingin = () => {
    history.push("/signin");
  };
  const addToFavorites = async () => {
    if (isUserExist) {
      adder();
    } else {
      toggleModal();
    }
  };

  const removeFromFavorites = async () => {
    remover();
  };

  return (
    <div role='crypto-card-container' className="card-container">
      <Modal
        show={modal}
        close={toggleModal}
        action={promptSingin}
        actionText={"LOG IN"}
      >
        To add crypto to watchlist you need to login first.
      </Modal>

      <div className="card">
        <div className="card-icon-container" onClick={promptCryptoDetail}>
          <img className="card-icon" alt={name} src={iconUrl} />
        </div>
        <div className="card-content">
          <div className="card-content-head">
            <h2 onClick={promptCryptoDetail}>
              {rank}. {name}
            </h2>
            {isLoading && <LoadingOutlined className="card-star-icon" />}

            {isFavCryptosFetched && !isFavCrypto && !isLoading && (
              <StarOutlined
                onClick={addToFavorites}
                className="card-star-icon"
              />
            )}

            {isFavCryptosFetched && isFavCrypto && !isLoading && (
              <StarFilled
                onClick={removeFromFavorites}
                className="card-star-icon"
              />
            )}
          </div>

          <div className="card-content-detail" onClick={promptCryptoDetail}>
            <p>
              Price: <b>{millify(price, { precision: 4 })}</b>
            </p>
            <p>
              Market Cap: <b>{millify(marketCap)}</b>
            </p>
            <p>
              Daily change:{" "}
              <b className={`${change > 0 ? "bullish" : "bearish"}`}>
                {millify(change)}%
              </b>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
