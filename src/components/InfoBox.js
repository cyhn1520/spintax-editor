import React, { Component } from "react";

function InfoBox({ data }) {
  return (
    <div className="col-sm-12 col-md-3 spintax-info-container">
      <span className="info">
        Content Length:{" "}
        <span className="info value">{data.textLength || 0}</span>
      </span>
      <hr />
      <span className="info">
        Spintax Count:{" "}
        <span className="info value">{data.spintaxListLength || 0}</span>
      </span>
      <hr />
      <span className="info">
        variation Count:{" "}
        <span className="info value">
          {data.variation * data.spintaxListLength || 0}
        </span>
      </span>
    </div>
  );
}

export default InfoBox;
