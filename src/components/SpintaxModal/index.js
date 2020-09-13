import React, { useState, useEffect } from "react";
import { InputField } from '../index'
import "./style.css";

let h3Ref = React.createRef();

const groupBy = function (xs, key) {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

const spanCreator = (className, value, tooltip = "") => {
  return `<span class='editor-${className}' title="${tooltip}">${value}</span>`;
};

function NewSpintaxModal(props) {
  const [optionList, setOptionList] = useState([
    { id: 0, level: 0, order: 0, text: "" }
  ]);

  useEffect(()=>{
    console.log('xx')
    h3Ref.current.innerHTML = `${spanCreator("statement","{")} ${spanCreator("statement","}")}`;
  }, [])

  const renderString = (list) => {
    const newList = groupBy(list, "level");
    let text = "";

    Object.values(newList).map((array, arrayIndex) => {
      arrayIndex !== 0 ? (text += `${spanCreator("tax","|")}${spanCreator("statement","{")}`) : (text += spanCreator("statement","{"));
      text += array
        .filter((item) => item.text !== "")
        .map(function (elem) {
          return elem.text;
        })
        .join(spanCreator("tax","|"));
    });
    Object.values(newList).map(() => (text += spanCreator("statement","}")));

    h3Ref.current.innerHTML = text;
    return text;
  };

  const onValueChange = ({ id, level, order, text }) => {
    const list = [...optionList];
    const value = list.find((item) => item.id === id);
    const preValue = list.find((item) => item.id === id - 1);
    if (preValue && level - preValue.level <= 1 && level >= 0) {
      value.level = level;
    }
    value.text = text;
    if (list[list.length - 1].text !== "") {
      list.push({ id: ++id, level, order: ++order, text: "" });
    }
    setOptionList(list);
    renderString(optionList);
  };

  return (
    <div
      class="modal fade"
      id="spintaxModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="spintaxModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              Add Spintax
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <h3 className="result-text" ref={h3Ref}></h3>
            {optionList.map((item) => (
              <InputField value={item} onValueChange={onValueChange} />
            ))}
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              class="btn btn-danger"
              onClick={()=> {
                setOptionList([{ id: 0, level: 0, order: 0, text: "" }])
                  h3Ref.current.innerHTML = "";
                }}
            >
              Reset
            </button>
            <button
              type="button"
              class="btn btn-primary"
              data-dismiss="modal"
              onClick={() => {
                props.editorRef.insertContent(h3Ref.current.innerHTML);
                setOptionList([{ id: 0, level: 0, order: 0, text: "" }]);
                h3Ref.current.innerHTML = "";
              }}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewSpintaxModal;
