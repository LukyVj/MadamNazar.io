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
      loaded: false,
      showCycles: false,
    };
  }

  groupBy = key => array =>
    array.reduce((objectsByKeyValue, obj) => {
      const value = obj[key];
      objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
      return objectsByKeyValue;
    }, {});

  getNewCycle = () => {
    fetch(
      "https://jeanropke.github.io/RDR2CollectorsMap/data/cycles.json?nocache=999999"
    )
      .then(response => response.json())
      .then(json => {
        [json.cycles].map(data =>
          this.setState({
            itemsCycle: data[json.current],
            ready: true
          })
        );
      });
  };

  componentDidMount() {
    this.getNewCycle();
    this.setState({ loaded: true });
    this.setState({
      day: formatDateTweet(new Date(Date.parse(this.props.day)))
    });
  }
  componentDidUpdate() {
    // this.state.ready && console.log(this.state.itemsCycle);
  }
  render() {
    const collectiblesPerCycle = this.state.itemsCycle
      ? Object.entries(this.state.itemsCycle).reduce(
          (acc, [collectible, cycle]) => {
            if (acc[cycle] === undefined) {
              acc[cycle] = [collectible];
            } else {
              acc[cycle].push(collectible);
            }
            return acc;
          },
          []
        )
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
            <span aria-labelledby="image" className="md:d-inline-block d-none w-30">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-eye"
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
                {this.state.ready &&
                  collectiblesPerCycle.map((bucket, cycle) =>
                    bucket ? (
                      <div className="p-8 bdr-6 cycle-item d-flex fxd-column">
                        <ul
                          className={`lis-none d-grid g-${
                            bucket.length > 1 ? "2" : "1"
                          } m-0 p-0 fx-12 ai-center jc-center`}
                        >
                          {bucket.map(collectible => (
                            <li className="p-4">
                              <img
                                alt=""
                                src={require(`../../images/icons/${collectible.replace(
                                  "_",
                                  "-"
                                )}.png`)}
                                className={`h-30 w-30 obf-contain obp-center ${collectible}`}
                              />
                            </li>
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
