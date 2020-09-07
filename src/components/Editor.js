import React, { Component } from "react";

let editorRef = React.createRef();
var newHTML = "";
let spintaxList = [];
let count = 0;

function Editor(props) {
  const spanCreator = (className, value, tooltip = "") => {
    return `<span class='editor-${className}' title="${tooltip}">${value}</span>`;
  };

  const insertContent = (text) => {
    editorRef.current.innerHTML = editorRef.current.innerHTML + text;
  };
  const reset = () => {
    editorRef.current.innerHTML = "";
  };

  console.log("editor.load");
  props.refX({
    insertContent,
    reset,
  });
  const onKeyUp = (e) => {
    props.setAllText(editorRef.current.textContent);
    if (e.keyCode == 32) {
      newHTML = "";
      spintaxList = [];

      const testArray = [];
      // Loop through words
      editorRef.current.textContent.split("").forEach(function (val) {
        console.log("val", val);
        if (val === "{" || val === "}") {
          testArray.push(spanCreator("statement", val));
        } else if (val === "|") {
          testArray.push(spanCreator("tax", val));
        } else {
          testArray.push(spanCreator("other", val));
        }
      });
      testArray.map((text) => (newHTML += text));
      editorRef.current.innerHTML = newHTML;

      // Set cursor postion to end of text
      var child = editorRef.current.children;
      var range = window.document.createRange();
      var sel = window.getSelection();
      try {
        range.setStart(child[child.length - 1], 1);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
        editorRef.current.focus();
      } catch (error) {}
    }

    var matches, options, random;
    var regEx = new RegExp(/{([^{}]+?)}/);
    spintaxList = [];
    count = 0;
    let variation = 1;
    let text = editorRef.current.textContent;
    while ((matches = regEx.exec(text)) !== null) {
      options = matches[1].split("|");
      random = Math.floor(Math.random() * options.length);
      text = text.replace(matches[0], options[random]);

      variation = variation * options.length;
      count += 1;
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
    <div
      ref={editorRef}
      className="editor"
      contenteditable="true"
      onKeyUp={onKeyUp}
    >
      <span className="other"></span>
    </div>
  );
}

export default Editor;
