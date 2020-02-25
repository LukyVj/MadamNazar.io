/** @jsx jsx */
import React, { Component } from "react";
import ReactGA from "react-ga";
import Iframe from "react-iframe";
import { jsx, css } from "@emotion/core";
import styles from "./CollectorMap.css";

import Infos from "../components/Infos";

import { COLLECTOR_MAP_URL } from "../scripts/constants";

class RDOMap extends Component {
  constructor(props) {
    super(props);
    this.state = { expandMap: false, iframeUrl: false };
  }

  render() {
    return (
      <>
        <Infos>
          Read dead redemption map from{" "}
          <a
            href="https://twitter.com/_jeanropke"
            onClick={() => {
              ReactGA.event({
                category: "click.map.link",
                action: "Click on jean ropke twitter profile"
              });
            }}
          >
            @JeanRopke
          </a>{" "}
        </Infos>
        <div
          className="pos-relative"
          css={
            this.state.expandMap === true &&
            css`
              position: fixed;
              top: 0;
              z-index: 9999999999;
              left: 2px;
              width: 100%;
              height: 100vh;
            `
          }
        >
          <button
            onClick={() => this.setState({ expandMap: !this.state.expandMap })}
            css={css`
              position: absolute;
              bottom: 32px;
              left: 16px;
              appearance: none;
              border: none;
              background: rgba(0, 0, 0, 0.8);
              padding: 1em;
              font-size: 16px;
              border-radius: 4px;
              color: white;
              z-index: 99999999999;
              cursor: pointer;
            `}
          >
            {this.state.expandMap === false ? "Expand Map" : "Reduce Map"}
          </button>

          <Iframe
            url="https://jeanropke.github.io/RDOMap/"
            title="Jean Ropke RDR2 Collector Map"
            height={this.state.expandMap === false ? 700 : "100%"}
            frameBorder="border: 4px solid var(--Armadillo);"
            id="myId"
            display="initial"
            position="relative"
            css={styles.iframe}
          />
        </div>
        <h4>
          Credit:{" "}
          <a
            href="https://github.com/jeanropke/RDOMap"
            onClick={() => {
              ReactGA.event({
                category: "click.map.link",
                action: "Click onjean RDOMap github project"
              });
            }}
          >
            @JeanRopke
          </a>
        </h4>
      </>
    );
  }
}
export default RDOMap;
