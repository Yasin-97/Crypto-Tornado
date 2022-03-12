import React from "react";
import { Link } from "react-router-dom";
import { FrownOutlined } from "assets/icons";

export default function NotFound() {
  return (
    <div className="notfound">
      <h1> <FrownOutlined /> 404!</h1>
      <h2>Opps... There is NOTHING here !</h2>
      <Link to="/" className="notfound-btn">
        Go to Glance
      </Link>
    </div>
  );
}
