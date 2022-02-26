import React, { useState, useLayoutEffect, useRef } from "react";
import { CaretDownOutlined,CaretUpOutlined } from "@ant-design/icons";
import millify from "millify";

export default function Exchange({
  trust_score_rank,
  image,
  name,
  trade_volume_24h_btc_normalized,
  url,
  year_established,
  description,
}) {
  // ref & states
  const descriptionRef = useRef();
  const [showDescription, setshowDescription] = useState(false);
  const [descriptionHeight, setdescriptionHeight] = useState(0);
  
  const descriptionScrollHeight=descriptionRef?.current?.scrollHeight
  
  const descriptionOpenHeight = showDescription ? descriptionHeight : "0";

  //side effects
  useLayoutEffect(() => { // to resize the height of description based on width
    function updateSize() {
      setshowDescription(false);
      setdescriptionHeight(descriptionScrollHeight);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, [descriptionScrollHeight]);


  return (
    <>
      <tr>
        <td className="nameCell">
          <b> {trust_score_rank}. <img src={image} alt="" /> {name} </b>
        </td>
        <td>{millify(trade_volume_24h_btc_normalized)}</td>
        <td role='exchange-year-established'>{year_established?year_established:'No Info'}</td>
        <td>{url?<a href={url} target="_blank" role='exchange-url'>{name}</a>:'No Info'}</td>
        <td role='exchange-more-info-button' className='more-info-cell' onClick={() => setshowDescription(!showDescription)}><b>More Info{showDescription?<CaretUpOutlined style={{marginLeft:'3px'}}/>:<CaretDownOutlined style={{marginLeft:'3px'}}/>}</b></td>
      </tr>
      <tr>
        <td className="descCell-container" colSpan="5">
          <div
            ref={descriptionRef}
            style={{ height: descriptionOpenHeight }}
            role='desc-cell'
            className="descCell"
          >
            {description?<h3>{description}</h3>:<h3>No description for this Exchange!</h3>} 
          </div>
        </td>
      </tr>
    </>
  );
}
