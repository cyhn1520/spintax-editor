import React, { useState } from "react";
import "./App.css";
import { Header, Editor, SpintaxModal, Generator, SpintaxList } from "./components";
import { storage } from "./tools";

let editorRef = { insertContent: () => { } };

function App() {
  const [spintaxData, setSpintaxData] = useState({});
  const [allText, setAllText] = useState("");
  const [savedSpintax, setSavedSpintax] = useState(storage.getAll());

  const saveSpintax = () => {
    var name = prompt("Please enter this spintax name", "spintax name");
    if (savedSpintax.filter((item) => item.name == name).length == 0) {
      storage.save({
        name,
        text: allText,
      });
      alert("Success!");
      setSavedSpintax(storage.getAll());
    } else {
      alert("Already saved with name.");
    }
  };

  const deleteSpintax = (name) => {
    storage.deleteFromName(name);
    alert("Success!");
    setSavedSpintax(storage.getAll());
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
              <Editor
                refX={(ref) => (editorRef = ref)}
                onSpintax={setSpintaxData}
                setAllText={setAllText}
                spintaxData={spintaxData}
                saveSpintax={saveSpintax}
              />
              <div className="row">
                <SpintaxList
                  data={savedSpintax}
                  deleteSpintax={deleteSpintax}
                />
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
      <SpintaxModal editorRef={editorRef} />
    </React.Fragment>
  );
}

export default App;
