import React, { useState, useLayoutEffect, useRef } from "react";
import millify from "millify";

export default function ExchangeDesc({
  rank,
  iconUrl,
  name,
  numberOfMarkets,
  marketShare,
  volume,
  description,
}) {
  // ref & states
  const descRef = useRef();
  const [showDesc, setShowDesc] = useState(false);
  const [descHeight, setDescHeight] = useState(0);

  const isDescOpen = showDesc ? descHeight : "0";

  //side effects
  useLayoutEffect(() => {
    function updateSize() {
      setShowDesc(false);
      setDescHeight(descRef?.current?.scrollHeight);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, [descRef?.current?.scrollHeight]);

  //inject html
  function createMarkup(description) {
    return {
      __html: description || `<h3>No description for this Exchange!</h3>`,
    };
  }

  return (
    <>
      <tr onClick={() => setShowDesc(!showDesc)}>
        <td className="nameCell">
          {rank}. <img src={iconUrl} alt="" /> {name}
        </td>
        <td>{millify(volume)}</td>
        <td>{millify(numberOfMarkets)}</td>
        <td>{millify(marketShare)}%</td>
      </tr>
      <tr>
        <td className="descCell-container" colSpan="4">
          <div
            ref={descRef}
            style={{ height: isDescOpen }}
            className="descCell"
            dangerouslySetInnerHTML={createMarkup(description)}
          />
        </td>
      </tr>
    </>
  );
}
