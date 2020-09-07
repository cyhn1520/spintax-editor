import React, { Component } from "react";

function SpintaxList({ data, deleteSpintax }) {
  return (
    <React.Fragment>
      {data.map((item) => (
        <div className="row list-item-container ">
          <div className="col-2 list-item-name">{item.name}</div>
          <div className="col-10">
            {item.text}
            <div
              className="btn btn-danger btn-delete"
              onClick={() => deleteSpintax(item.name)}
            >
              x
            </div>
          </div>
        </div>
      ))}
    </React.Fragment>
  );
}

export default SpintaxList;
