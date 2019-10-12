/** @jsx jsx */
import { Component } from "react";
import { jsx } from "@emotion/core";
import { formatDateTweet } from "../../scripts/helpers";
import styles from "./Frame.css";

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
      <div css={styles.root} className="p-16">
        {/* <p>
            She was found today {props.parent.state.dataFor} cycle {dayCycle}
          </p> */}

        <div className="maw-1200 m-auto d-grid g-2 ">
          <h4 className="m-0 p-0 ta-left">{this.state.day}</h4>
          <h4 className="m-0 p-0 ta-right"> Cycle {this.state.cycle}</h4>
        </div>
      </div>
    );
  }
}

export default Frame;
