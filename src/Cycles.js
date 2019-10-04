/** @jsx jsx */
import React, { Component } from "react";
import { css, jsx } from "@emotion/core";
import ReactGA from "react-ga";
import RDAppear from "./RDAppear";
import Map from "./Map";
import { isConditional } from "@babel/types";

const capitalize = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const weekDay = new Date().getUTCDay();
let dayCycle;
switch (weekDay) {
  case 2: //tuesday
  case 4: //thursday
  case 6: //saturday
    dayCycle = 1;
    break;

  case 0: //sunday
  case 3: //wednesday
    dayCycle = 2;
    break;

  case 1: //monday
  case 5: //friday
    dayCycle = 3;
    break;
  default:
    dayCycle = 0;
}

class Cycles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cycle: this.props.cycle
    };
  }

  fetchData = () => {
    const url =
      "https://cors-anywhere.herokuapp.com/https://jeanropke.github.io/RDR2CollectorsMap/items.json";
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        "Access-Control-Allow-Origin": "*",
        "Accept-Encoding": "gzip, deflate",
        Authorization:
          "Bearer AAAAAAAAAAAAAAAAAAAAABrO0AAAAAAA8qTMsAShpS43PMvZweECxqTZ728%3DFF6BCPcE2CBuqYeTo00Z88tQxNIPWerPb7fEzmpaUE75nzF8LO",
        "Cache-Control": "no-cache",
        Connection: "keep-alive"
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ data });
      })
      .catch(function(err) {
        console.log("error", err);
      });
  };

  componentDidMount() {
    this.props.parent.setState({ currentPage: window.location.pathname });
    this.fetchData();

    console.log(this.props.parent.state.cycle);
  }

  render() {
    const dataExists = this.state.data !== null && this.state.data;
    return (
      <>
        <div id="frame">
          {dataExists ? (
            this.state.data.map(item => (
              <div className="d-inline-block">
                <p>
                  {item.text.replace(/_/g, " ")} {item.day} - {this.state.cycle}
                  <img src={require(`./images/icons/${item.icon}.png`)} />
                </p>
              </div>
            ))
          ) : (
            <p>no data bitch</p>
          )}
          {this.state.fail === true && (
            <div
              css={css`
                background: rgba(255, 0, 0, 0.1);
                color: red;
                padding: 16px;
                border-radius: 8px;
                border: 1px solid red;
                margin: 100px auto;
                max-width: 600px;
                line-height: 2;
              `}
            >
              <p>
                An error occured or there is no data to display. <br />
                Please refresh the page, or send us a tweet at @LukyVj
              </p>
            </div>
          )}
        </div>
      </>
    );
  }
}
export default Cycles;
