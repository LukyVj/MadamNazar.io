/** @jsx jsx */
import React, { Component } from "react";
import { css, jsx } from "@emotion/core";
import { formatDateTweet } from "./scripts/helpers";

const styles = {
  root: css`
    border-color: #2e2e2e;
    border-image-repeat: all;
    border-image-slice: 14;
    border-image-source: url(${require("./images/frame.png")});
    border-style: solid;
    border-width: 6px 0;
    padding: 16px;
    text-align: center;
    width: calc(100% - 16px * 2);
    font-family: "RDRrocks-sg";
    letter-spacing: 2px;
    color: white;
    -webkit-font-smoothing: antialiased;
    background: url(${require("./images/bgOnline.png")});
    top: 0;
    position: fixed;
    left: 0;
    font-size: 2em;
    z-index: 10;

    @media (max-width: 960px) {
      font-size: 1.45em;
    }
  `
};

class Frame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cycle: 0,
      day: 0
    };
  }
  componentDidMount() {
    this.props.cycle !== undefined &&
      this.setState({
        cycle: this.props.cycle,
        day: formatDateTweet(new Date(Date.parse(this.props.day)))
      });
  }

  render() {
    return (
      <div css={styles.root} className="d-grid g-2 p-16">
        {/* <p>
            She was found today {props.parent.state.dataFor} cycle {dayCycle}
          </p> */}

        <h4 className="m-0 p-0 ta-left">{this.state.day}</h4>
        <h4 className="m-0 p-0 ta-right"> Cycle {this.state.cycle}</h4>
      </div>
    );
  }
}

export default Frame;
