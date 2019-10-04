/** @jsx jsx */
import React, { Component } from "react";
import Iframe from "react-iframe";
import { css, jsx } from "@emotion/core";

class CollectorMap extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.parent.setState({ currentPage: window.location.pathname });
  }

  render() {
    return (
      <>
        <h2>Read dead redemption collectors map :</h2>
        <Iframe
          url="https://jeanropke.github.io/RDR2CollectorsMap/?utm_source=madamnazar.io"
          title="Jean Ropke RDR2 Collector Map"
          width="100%"
          height="640px"
          frameBorder="border: 4px solid var(--Armadillo);"
          id="myId"
          className="mv-32"
          display="initial"
          position="relative"
          css={css`
            border: 4px solid var(--Armadillo);
            background: #d2b790;
          `}
        />
        <h4>
          Credit:{" "}
          <a href="https://github.com/jeanropke/RDR2CollectorsMap">
            @JeanRopke
          </a>
        </h4>
      </>
    );
  }
}
export default CollectorMap;
