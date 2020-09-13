import React from "react";
import "./style.css";

function SpintaxList({ data, deleteSpintax }) {
  return (
    <div className="col-12 spintax-list-container">
      {data.map((item) => (
        <div className="row list-item-container">
          <div className="col-2 list-item-name">{item.name}</div>
          <div className="col-10">
            {item.text}
            <div
              className=" btn-delete"
              onClick={() => deleteSpintax(item.name)}
            >
              x
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SpintaxList;
