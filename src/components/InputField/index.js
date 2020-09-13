import React, { useState, useEffect } from "react";

const InputField2 = (props) => {
  const { value } = props;

  return (
    <div
      className="input-container"
      style={{ marginLeft: `${value.level * 20}px` }}
    >
      <div className="input-row">
      
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <button
              className="btn btn-outline-secondary"
              onClick={() => {
                props.onValueChange({ ...value, level: value.level - 1 });
              }}
            >
              {"<"}
            </button>
            <button
              className="btn btn-outline-secondary"
              onClick={() => {
                console.log({ ...value, level: value.level + 1 });
                props.onValueChange({ ...value, level: value.level + 1 });
              }}
            >
              {">"}
            </button>
          </div>
          <input
            type="text"
            value={value.text}
            placeholder="input text"
            className="form-control"
            onChange={(e) =>
              props.onValueChange({ ...value, text: e.target.value })
            }
          />
        </div>


      </div>
    </div>
  );
};

export default InputField2;
