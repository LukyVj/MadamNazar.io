/** @jsx jsx */
import React, { Component } from "react";
import ReactGA from "react-ga";
import Iframe from "react-iframe";
import { jsx, css } from "@emotion/core";
import styles from "./CollectorMap.css";

class CollectorMap extends Component {
  constructor(props) {
    super(props);
    this.state = { expandMap: false };
  }

  componentDidMount() {
    this.props.parent.setState({ currentPage: window.location.pathname });
  }

  render() {
    return (
      <>
        <h2>
          Read dead redemption collectors map from{" "}
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
          :
        </h2>
        <div
          className="pos-relative"
          css={
            this.state.expandMap === true &&
            css`
              position: fixed;
              top: 90px;
              z-index: 9999999999;
              left: 2px;
              width: calc(100% - 16px);
              height: 82vh;
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
              border-radius: 100px;
              color: white;
              z-index: 99999999999;
              cursor: pointer;
            `}
          >
            {this.state.expandMap === false ? "Expand Map" : "Reduce Map"}
          </button>
          <Iframe
            url="https://jeanropke.github.io/RDR2CollectorsMap/?utm_source=madamnazar.io"
            title="Jean Ropke RDR2 Collector Map"
            height={this.state.expandMap === false ? "640px" : "100%"}
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
            href="https://github.com/jeanropke/RDR2CollectorsMap"
            onClick={() => {
              ReactGA.event({
                category: "click.map.link",
                action: "Click onjean RDR2CollectorsMap github project"
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
export default CollectorMap;
