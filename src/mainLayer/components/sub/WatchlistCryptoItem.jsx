import React from "react";
import millify from "millify";
import { StarFilled, LoadingOutlined } from "@ant-design/icons";
import {useSetFavoriteItem} from "../../index";

export default function WatchlistCryptoItem({
  isFav,
  uuid,
  rank,
  iconUrl,
  name,
  price,
  change,
  marketCap,
  circulatingSupply,
}) {
  //custom hook
  const { isLoading, remover } = useSetFavoriteItem({isFav, uuid, name});

  const removeFromFavorites = async () => {
    remover();
  };

  return (
    <>
      <tr>
        <td>
          {isLoading && (
            <LoadingOutlined style={{ fontSize: "1.1rem", color: "#39b3fe" }} />
          )}

          {!isLoading && (
            <StarFilled
              onClick={removeFromFavorites}
              style={{ fontSize: "1.1rem", color: "#39b3fe" }}
            />
          )}
        </td>

        <td>{rank}</td>
        <td className="nameCell">
          <img src={iconUrl} alt="" /> {name}
        </td>
        <td>{millify(price)}</td>
        <td className={`${change > 0 ? "bullish" : "bearish"}`}>
          {millify(change)}%
        </td>
        <td>{millify(marketCap)}</td>
        <td>{circulatingSupply ? millify(circulatingSupply) : "No Info"}</td>
      </tr>
    </>
  );
}
