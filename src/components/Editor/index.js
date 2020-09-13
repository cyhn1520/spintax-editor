import React, { useState } from "react";
import "./style.css";
import { InfoBox } from "../../components/index";

let editorRef = React.createRef();

function Editor(props) {
  const [error, setError] = useState("");
  const spanCreator = (className, value, tooltip = "") => {
    return `<span class='editor-${className}' title="${tooltip}">${value}</span>`;
  };

  const insertContent = (text) => {
    editorRef.current.innerHTML = editorRef.current.innerHTML + text;
  };
  const reset = () => {
    editorRef.current.innerHTML = "";
  };

  props.refX({
    insertContent,
    reset,
  });

  const setCursorPosition = () => {
    // Set cursor postion to end of text
    let child = editorRef.current.children;
    let range = window.document.createRange();
    let sel = window.getSelection();
    try {
      range.setStart(child[child.length - 1], 1);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
      editorRef.current.focus();
    } catch (error) { }
  }

  const onKeyUp = (e) => {
    props.setAllText(editorRef.current.textContent);
    if (e.keyCode >= 37 && e.keyCode <= 40) return;

    let newHTML = "";
    const inputArray = [];

    editorRef.current.textContent.split("").forEach(function (val) {
      if (val === "{" || val === "}") {
        inputArray.push(spanCreator("statement", val));
      } else if (val === "|") {
        inputArray.push(spanCreator("tax", val));
      } else {
        inputArray.push(spanCreator("other", val));
      }
    });
    inputArray.map((text) => (newHTML += text));
    
    if((newHTML.match(/{/g) || []).length !== (newHTML.match(/}/g) || []).length) {
      setError('Error: unclosed spintax expression.');
    } else {
      setError('');
    }
    editorRef.current.innerHTML = newHTML;
    setCursorPosition();


    let matches, options, random, spintaxList = [], variation = 1;
    let regEx = new RegExp(/{([^{}]+?)}/), text = editorRef.current.textContent;
    while ((matches = regEx.exec(text)) !== null) {
      options = matches[1].split("|");
      random = Math.floor(Math.random() * options.length);
      text = text.replace(matches[0], options[random]);

      variation = variation * options.length;
      spintaxList.push({
        text: matches[0],
        options,
        count: options.length,
      });
    }

    props.onSpintax({
      spintaxList: spintaxList,
      textLength: editorRef.current.textContent.length,
      spintaxListLength: spintaxList.length,
      variation: variation / spintaxList.length,
    });
  };

  return (
    <div className="row">
      <div className="col-sm-12 col-md-9 spintax-editor-container">
        <button
          type="button"
          class="btn btn-primary btn-custom"
          data-toggle="modal"
          data-target="#spintaxModal"
        >
          Add Spintax
        </button>
        <div
          ref={editorRef}
          className="editor"
          contenteditable="true"
          onKeyUp={onKeyUp}
        >
          <span className="other"></span>
        </div>
        {error !== '' ? <div className="error-message">{error}</div> : null}
        <input
          type="button"
          class="btn btn-success btn-custom"
          value="Save"
          onClick={() => props.saveSpintax()}
        />
        <input
          type="button"
          class="btn btn-danger btn-custom"
          value="Reset"
          onClick={() => editorRef.reset()}
        />
      </div>
      <InfoBox data={props.spintaxData} />
    </div>
  );
}

export default Editor;
