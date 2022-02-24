import React, { useState, useLayoutEffect, useRef } from "react";
<<<<<<< HEAD
import millify from "millify";

export default function ExchangeDesc({
  rank,
  iconUrl,
  name,
  numberOfMarkets,
  marketShare,
  volume,
=======
import { CaretDownOutlined,CaretUpOutlined } from "@ant-design/icons";
import millify from "millify";

export default function ExchangeDesc({
  trust_score_rank,
  image,
  name,
  trade_volume_24h_btc_normalized,
  url,
  year_established,
>>>>>>> parent of 2a6fa06 (edited couple of files to be correspondent to testing)
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
<<<<<<< HEAD
      __html: description || `<h3>No description for this Exchange!</h3>`,
=======
      __html: description?description : `<h3>No description for this Exchange!</h3>`,
>>>>>>> parent of 2a6fa06 (edited couple of files to be correspondent to testing)
    };
  }

  return (
    <>
<<<<<<< HEAD
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
=======
      <tr>
        <td className="nameCell">
          <b> {trust_score_rank}. <img src={image} alt="" /> {name} </b>
        </td>
        <td>{millify(trade_volume_24h_btc_normalized)}</td>
        <td>{year_established?year_established:'No Info'}</td>
        <td>{url?<a href={url} target="_blank">{name}</a>:'No Info'}</td>
        <td className='more-info-cell' onClick={() => setShowDesc(!showDesc)}><b>More Info{showDesc?<CaretUpOutlined style={{marginLeft:'3px'}}/>:<CaretDownOutlined style={{marginLeft:'3px'}}/>}</b></td>
      </tr>
      <tr>
        <td className="descCell-container" colSpan="5">
          {/* <div ref={descRef}
            style={{ height: isDescOpen }}
            className="descCell">
            <p>face book</p>
            <p>face book</p>
            <b>face book</b>
            <b>face book</b>
          </div> */}
>>>>>>> parent of 2a6fa06 (edited couple of files to be correspondent to testing)
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
