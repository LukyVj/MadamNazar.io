/** @jsx jsx */
import React, { Component } from "react";
import Iframe from "react-iframe";
import { css, jsx } from "@emotion/core";

class CollectorMap extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <>
        <h2>Read dead redemption collectors map</h2>
        <h4>
          Credit:{" "}
          <a href="https://github.com/jeanropke/RDR2CollectorsMap">
            @JeanRopke
          </a>
        </h4>
        <Iframe
          url="https://jeanropke.github.io/RDR2CollectorsMap/"
          title="Jean Ropke RDR2 Collector Map"
          width="100%"
          height="640px"
          frameBorder="border: 4px solid var(--Armadillo);"
          id="myId"
          className="mv-32"
          display="initial"
          position="relative"
          css={css`
            border: 2px solid var(--Armadillo);
          `}
        />
      </>
    );
  }
}
export default CollectorMap;
