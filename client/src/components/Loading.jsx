import React from "react";
import loadingSpinner from "assets/svg/loading.svg";

export default function Loading() {
  return (
    <div role='loading' style={{ display: "flex", justifyContent: "center" }}>
      <img src={loadingSpinner} alt="" />{" "}
    </div>
  );
}
