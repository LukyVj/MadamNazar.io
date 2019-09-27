/** @jsx jsx */
import React, { Component } from "react";
import { css, jsx } from "@emotion/core";

class RDAppear extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const styles = {
      root: css`
        animation: blur 5s forwards;
        position: relative;
        overflow: hidden;
        height: ${this.props.height}px;
        width: ${this.props.width}px;

        & > div {
          height: ${this.props.height}px;
          position: absolute;
          width: ${this.props.width}px;
        }

        .normal,
        .invert {
          background-image: url(${this.props.image});
        }

        .normal {
          background-size: cover;
        }

        .invert {
          animation: mask 5s steps(69) forwards;
          background-size: cover;
          filter: invert(1) grayscale(1);
          -webkit-mask: url(${require("./images/sheet.png")});
          -webkit-mask-size: 7000% 100%;
          mask: url(${require("./images/sheet.png")});
          mask-size: 7000% 100%;
        }

        @keyframes blur {
          from {
            filter: blur(3px);
            opacity: 0;
          }
          to {
            filter: blur(0px);
            opacity: 1;
          }
        }

        @keyframes mask {
          from {
            -webkit-mask-position: 0% 0;
            mask-position: 0% 0;
          }
          to {
            -webkit-mask-position: 100% 0;
            mask-position: 100% 0;
          }
        }
      `
    };
    return (
      <div css={styles.root} {...this.props}>
        <div className="normal" css={this.props.childrenStyle}></div>
        <div className="invert" css={this.props.childrenStyle}></div>
      </div>
    );
  }
}

export default RDAppear;
