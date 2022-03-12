import React from "react";
import { FrownOutlined } from "assets/icons";

export default function ErrorMessage({ children, refetchAction }) {
  return (
    <div className="errorMessage">
      <FrownOutlined />
      <h2>
        {children}
        {refetchAction&&<span onClick={() => refetchAction()} className="refetch">
          Retry
        </span>}
      </h2>
    </div>
  );
}
