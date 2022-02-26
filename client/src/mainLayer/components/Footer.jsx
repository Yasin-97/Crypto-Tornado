import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="footer">
      <h4>
        Cryptornado
        <br />
        All rights reserved
      </h4>
      <br />
      <div className="footer-links">
        <Link to="/">Glance</Link>
        <Link to="/cryptocurrencies">Cryptocurrencies</Link>
        <Link to="/exchanges">Exchanges</Link>
        <Link to="/news">News</Link>
      </div>
    </div>
  );
}
