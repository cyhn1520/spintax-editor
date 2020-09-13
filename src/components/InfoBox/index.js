import React from "react";
import "./style.css";

function InfoBox({ data }) {
  console.log('data', data)
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
      <hr />
      {(data.spintaxList || []).map(item => (
        <div className="spintax-json">
          <span className="editor-statement">{'{'}</span>
          {item.options.map((opt,i) => (
            <React.Fragment>
              {i != 0 ? <span className="editor-tax">|</span> : ''}
              <span className="editor-option">{opt}</span>
            </React.Fragment>
          ))}
          <span className="editor-statement">}</span>
        </div>
      ))}
    </div>
  );
}

export default InfoBox;
