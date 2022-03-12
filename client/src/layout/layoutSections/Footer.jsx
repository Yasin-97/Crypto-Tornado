import React from "react";
import {CopyrightOutlined} from 'assets/icons'
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-links">
        <Link to="/">Glance</Link>
        <Link to="/cryptocurrencies">Cryptocurrencies</Link>
        <Link to="/exchanges">Exchanges</Link>
        <Link to="/news">News</Link>
      </div>
      <br />
      <h5 >
        Cryptornado
        <br/>
        <CopyrightOutlined /> 2022  All Rights Reserved. <a href='https://github.com/Yasin-97'>Yasin Zahiri</a>
      </h5>
    </div>
  );
}
