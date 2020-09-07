import React, { createRef, useState, useEffect, useRef } from "react";
import "./App.css";
import Header from "./components/Header";
import Editor from "./components/Editor";
import NewSpintaxModal from "./components/NewSpintaxModal";
import { save, getAll, deleteFromName } from "./tools/storage";
import Generator from "./components/Generator";
import InfoBox from "./components/InfoBox";
import SpintaxList from "./components/SpintaxList";

let editorRef = { insertContent: () => {} };

function App() {
  const [spintaxData, setSpintaxData] = useState({});
  const [allText, setAllText] = useState("");
  const [savedSpintax, setSavedSpintax] = useState(getAll());

  const saveSpintax = () => {
    var name = prompt("Please enter this spintax name", "spintax name");
    if (savedSpintax.filter((item) => item.name == name).length == 0) {
      save({
        name,
        text: allText,
      });
      alert("Success!");
      setSavedSpintax(getAll());
    } else {
      alert("Already saved with name.");
    }
  };

  const deleteSpintax = (name) => {
    deleteFromName(name);
    alert("Success!");
    setSavedSpintax(getAll());
  };

  return (
    <React.Fragment>
      <Header />
      <div className="App-dark container">
        <div className="tab-content" id="myTabContent">
          <div class="tab-content" id="nav-tabContent">
            <div
              class="tab-pane fade show active"
              id="nav-editor"
              role="tabpanel"
              aria-labelledby="nav-editor-tab"
            >
              <div className="row">
                <div className="col-sm-12 col-md-9 spintax-editor-container">
                  <button
                    type="button"
                    class="btn btn-primary btn-custom"
                    data-toggle="modal"
                    data-target="#exampleModal"
                    onClick={() => editorRef.insertContent(" ")}
                  >
                    Add Spintax
                  </button>
                  <Editor
                    refX={(ref) => (editorRef = ref)}
                    onSpintax={setSpintaxData}
                    setAllText={setAllText}
                  />
                  <input
                    type="button"
                    class="btn btn-success btn-custom"
                    value="Save"
                    onClick={() => saveSpintax()}
                  />
                  <input
                    type="button"
                    class="btn btn-danger btn-custom"
                    value="Reset"
                    onClick={() => editorRef.reset()}
                  />
                </div>
                <InfoBox data={spintaxData} />
              </div>
              <div className="row">
                <div className="col-12 spintax-list-container">
                  <SpintaxList
                    data={savedSpintax}
                    deleteSpintax={deleteSpintax}
                  />
                </div>
              </div>
            </div>
            <div
              class="tab-pane fade"
              id="nav-generator"
              role="tabpanel"
              aria-labelledby="nav-generator-tab"
            >
              <Generator savedSpintax={savedSpintax} />
            </div>
          </div>
        </div>
      </div>
      <NewSpintaxModal editorRef={editorRef} />
    </React.Fragment>
  );
}

export default App;
