import React, { useState, useEffect } from "react";

let h3Ref = React.createRef();

function NewSpintaxModal(props) {
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const spanCreator = (className, value, tooltip = "") => {
    return `<span class='editor-${className}' title="${tooltip}">${value}</span>`;
  };

  useEffect(() => {
    let optionsText = "";
    options.map((item, i) => {
      optionsText += `${i > 0 ? spanCreator("tax", "|") : ""}${spanCreator(
        "option",
        item
      )}`;
    });
    h3Ref.current.innerHTML = `${spanCreator(
      "statement",
      "{"
    )}${optionsText}${spanCreator("statement", "}")}`;
  }, [options]);

  const onKeyUp = (event) => {
    if (event.keyCode === 13) {
      setOptions([...options, inputValue]);
      setInputValue("");
    }
  };

  return (
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
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
            <h3 ref={h3Ref}></h3>
            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control"
                placeholder="keyword"
                onKeyUp={(e) => onKeyUp(e)}
                onChange={(e) => setInputValue(e.target.value)}
                value={inputValue}
              />
              <div class="input-group-append">
                <button
                  class="btn btn-outline-secondary"
                  type="button"
                  onClick={() => {
                    setOptions([...options, inputValue]);
                    setInputValue("");
                  }}
                >
                  +
                </button>
              </div>
            </div>
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
              class="btn btn-primary"
              data-dismiss="modal"
              onClick={() => {
                props.editorRef.insertContent(h3Ref.current.innerHTML);
                setInputValue("");
                setOptions([]);
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
