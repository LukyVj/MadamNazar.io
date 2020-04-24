/** @jsx jsx */
import { Component } from "react";
import { css, jsx } from "@emotion/core";
import { formatDateTweet } from "../../scripts/helpers";
import styles from "./Frame.css";
import ObjectEntries from "object.entries";

class Frame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cycle: this.props.cycle,
      day: 0,
      loaded: false,
      showCycles: false,
    };
  }

  cleanDate = (date) => {
    var dd = String(date.getDate()).padStart(2, "0");
    var mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = date.getFullYear();

    return mm + "/" + dd + "/" + yyyy;
  };

  formatDate = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  groupBy = (key) => (array) =>
    array.reduce((objectsByKeyValue, obj) => {
      const value = obj[key];
      objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
      return objectsByKeyValue;
    }, {});

  componentDidMount() {
    this.setState({
      loaded: true,
      day: formatDateTweet(new Date(Date.parse(this.props.day))),
    });
  }

  render() {
    const collectiblesPerCycle = this.state.cycle
      ? ObjectEntries(this.state.cycle).reduce((acc, [collectible, cycle]) => {
          if (acc[cycle] === undefined) {
            acc[cycle] = [collectible];
          } else {
            acc[cycle].push(collectible);
          }
          return acc;
        }, [])
      : [];

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
            <h1 className="p-0 m-0 pos-relative ph-8 d-inline-block">
              <a href="/" className="td-none color-current">
                MadamNazar.io
              </a>
            </h1>
            <p className="d-none md:d-block  label p-0 m-0">
              Resources for Red dead redemption online
            </p>
          </div>
          <h4
            className="m-0 p-0 ta-right pos-relative d-block cursor-pointer"
            onMouseOver={() => {
              this.setState({ showCycles: true });
            }}
            onMouseOut={() => {
              this.setState({ showCycles: false });
            }}
            css={css`
              order: 1;
              @media (max-width: 960px) {
                order: 2;
              }
            `}
          >
            {" "}
            Cycle{" "}
            <span
              aria-labelledby="image"
              className="md:d-inline-block d-none w-30"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-eye"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </span>
            <div className={this.state.showCycles ? "d-block" : "d-none"}>
              <div
                className={`d-grid g-2 ggap-8 ta-center ${
                  this.state.showCycles ? "d-block" : "d-none"
                }`}
                css={styles.cyclesPopup}
              >
                {collectiblesPerCycle &&
                  collectiblesPerCycle.map((bucket, cycle) =>
                    bucket ? (
                      <div
                        key={cycle}
                        className="p-8 bdr-6 cycle-item d-flex fxd-column"
                      >
                        <ul
                          className={`lis-none d-grid g-${
                            bucket.length > 1 ? "2" : "1"
                          } m-0 p-0 fx-12 ai-center jc-center`}
                        >
                          {bucket.map((collectible, idx) => (
                            <span key={idx}>
                              {collectible === "lost_jewelry" ? (
                                ["bracelet", "earring", "necklace", "ring"].map(
                                  (jewel, index) => (
                                    <li
                                      className="p-4 d-inline-block"
                                      key={index}
                                    >
                                      <img
                                        alt={`${jewel}`}
                                        src={require(`../../images/icons/${jewel}.png`)}
                                        className={`h-30 w-30 obf-contain obp-center ${jewel}`}
                                      />
                                    </li>
                                  )
                                )
                              ) : collectible === "tarot_cards" ? (
                                ["cups", "pentacles", "swords", "wands"].map(
                                  (card, index) => (
                                    <li
                                      className="p-4 d-inline-block"
                                      key={index}
                                    >
                                      <img
                                        alt={`card-${card}`}
                                        src={require(`../../images/icons/${card}.png`)}
                                        className={`h-30 w-30 obf-contain obp-center ${card}`}
                                      />
                                    </li>
                                  )
                                )
                              ) : (
                                <li className="p-4 d-inline-block">
                                  <img
                                    alt={collectible}
                                    src={require(`../../images/icons/${collectible.replace(
                                      "_",
                                      "-"
                                    )}.png`)}
                                    className={`h-30 w-30 obf-contain obp-center ${collectible}`}
                                  />
                                </li>
                              )}
                            </span>
                          ))}
                        </ul>
                        <footer className="p-8 jc-end">CYCLE {cycle}</footer>
                      </div>
                    ) : null
                  )}
              </div>
            </div>
          </h4>
        </div>
      </div>
    );
  }
}

export default Frame;
