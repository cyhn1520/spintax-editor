import React, { useState } from "react";
import "./style.css";
import { copyToClipboard, spintax } from "../../tools";

function Generator(props) {
  const [selectedSpintax, setSelectedSpintax] = useState(
    props.savedSpintax[0] || []
  );
  const [generated, setGenerated] = useState(
    spintax.generateRandom(
      props.savedSpintax.length > 0 ? props.savedSpintax[0].text : ""
    )
  );
  return (
    <div className="row">
      <div className="col-sm-12 col-md-3 generator-spintax-list">
        {props.savedSpintax.map((item) => (
          <div
            className={`row ${
              item.name === selectedSpintax.name ? "active" : "item"
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
              onClick={() => setGenerated(spintax.generateRandom(selectedSpintax.text))}
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
