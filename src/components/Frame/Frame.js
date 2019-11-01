/** @jsx jsx */
import { Component } from "react";
import { css, jsx } from "@emotion/core";
import { formatDateTweet } from "../../scripts/helpers";
import styles from "./Frame.css";

class Frame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cycle: 0,
      day: 0,
      loaded: false
    };
  }
  componentDidMount() {
    this.setState({ loaded: true });
    this.props.cycle !== undefined &&
      this.setState({
        cycle: this.props.cycle,
        day: formatDateTweet(new Date(Date.parse(this.props.day)))
      });
  }

  render() {
    return (
      <div css={[styles.root]} className="p-16">
        <div className="maw-1200 m-auto d-flex ai-center jc-between md:jc-center fxw-wrap md:fxw-nowrap">
          <h4
            className="m-0 p-0 ta-left"
            css={css`
              order: 1;
              @media (max-width: 960px) {
                order: 2;
              }
            `}
          >
            {this.state.day}
          </h4>
          <div
            className="fx-12 md:fx-8 mb-16 md:mb-0"
            css={css`
              order: 1;
            `}
          >
            <h1 className="p-0 m-0 pos-relative ph-8">
              <a href="/" className="td-none color-current">
                MadamNazar.io
              </a>
            </h1>
            <p className="d-none md:d-block  label p-0 m-0">
              Resources for Red dead redemption online
            </p>
          </div>
          <h4
            className="m-0 p-0 ta-right"
            css={css`
              order: 1;
              @media (max-width: 960px) {
                order: 2;
              }
            `}
          >
            {" "}
            Cycle {this.state.cycle}
          </h4>
        </div>
      </div>
    );
  }
}

export default Frame;
