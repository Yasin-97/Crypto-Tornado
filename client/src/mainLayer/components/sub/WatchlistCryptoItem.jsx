import React from "react";
import millify from "millify";
import { StarFilled, LoadingOutlined } from "@ant-design/icons";
import {useSetFavoriteItem} from "mainLayer/index";

export default function WatchlistCryptoItem({
  isFav,
  uuid,
  rank,
  iconUrl,
  name,
  price,
  change,
  marketCap,
  dailyVolume
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
        <td>{millify(price ,{ precision: 4 })}</td>
        <td>
          <p style={{margin:'0',padding:'0 .5rem',textAlign:'center'}} className={`${change > 0 ? "bullish" : "bearish"}`}>{millify(change)}%</p>
        </td>
        <td>{millify(marketCap)}</td>
        <td>{dailyVolume? millify(dailyVolume) : "No Info"}</td>
      </tr>
    </>
  );
}
