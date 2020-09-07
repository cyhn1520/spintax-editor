import React, { Component, useState } from "react";
import { copyToClipboard } from "../tools/copyToClipboard";
import { generateRandom } from "../tools/spintax";

function Generator(props) {
  const [selectedSpintax, setSelectedSpintax] = useState(
    props.savedSpintax[0] || []
  );
  const [generated, setGenerated] = useState(
    generateRandom(
      props.savedSpintax.length > 0 ? props.savedSpintax[0].text : ""
    )
  );
  return (
    <div className="row">
      <div className="col-sm-12 col-md-3 spintax-info-container">
        {props.savedSpintax.map((item) => (
          <div
            className={`row list-item-container ${
              item.name === selectedSpintax.name ? "active" : ""
            }`}
            onClick={() => setSelectedSpintax(item)}
          >
            {item.name}
          </div>
        ))}
      </div>
      <div className="col-sm-12 col-md-9 spintax-generator-container">
        <div className="row">
          <div className="col-12 spintax-generator-title">
            {" "}
            {selectedSpintax.text}{" "}
          </div>
          <div className="col-12">
            <input
              type="button"
              class="btn btn-primary btn-custom"
              value="Generate Random Text"
              onClick={() => setGenerated(generateRandom(selectedSpintax.text))}
            />
          </div>
        </div>
        <div className="generator-result row">
          <div className="generator-text">
            {generated}
            <div
              onClick={() => copyToClipboard(generated)}
              className="btn-copy btn-custom"
            >
              copy text
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Generator;
