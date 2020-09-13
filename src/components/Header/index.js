import React, { Component } from "react";
import "./style.css";

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark static-top">
      <div className="container">
        <a className="navbar-brand" href="#">
          Spintax Editor
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ml-auto ">
            <div class="nav nav-tabs" id="nav-tab" role="tablist">
              <a
                class="nav-item nav-link tab-item active"
                id="nav-editor-tab"
                data-toggle="tab"
                href="#nav-editor"
                role="tab"
                aria-controls="nav-editor"
                aria-selected="true"
              >
                Editor
              </a>
              <a
                class="nav-item nav-link"
                id="nav-generator-tab"
                data-toggle="tab"
                href="#nav-generator"
                role="tab"
                aria-controls="nav-generator"
                aria-selected="false"
              >
                Generator
              </a>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
