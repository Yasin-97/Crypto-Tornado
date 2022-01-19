import React, { useState, useLayoutEffect, useRef } from "react";
import { CaretDownOutlined,CaretUpOutlined } from "@ant-design/icons";
import millify from "millify";

export default function ExchangeDesc({
  trust_score_rank,
  image,
  name,
  trade_volume_24h_btc_normalized,
  url,
  year_established,
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
      __html: description?description : `<h3>No description for this Exchange!</h3>`,
    };
  }

  return (
    <>
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
