/* eslint-disable jsx-a11y/anchor-is-valid */
/** @jsx jsx */
import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import ReactGA from "react-ga";
import { css, jsx } from "@emotion/core";

import { navigation } from "./data/navigation";

import Frame from "./Frame";
import Finder from "./Finder";
import CollectorMap from "./CollectorMap";
import About from "./About";
import Cycles from "./Cycles";
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

const dateEvent = new Date();
const dateOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric"
};

const styles = {
  badge: css`
    width: 120px;
    height: 120px;
    border-radius: 100px;
    border: 4px solid var(--Armadillo);
    background: var(--Twine);
    box-shadow: 0 0 32px rgba(0, 0, 0, 0.2);
    display: block;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 100px auto;
    animation: roll 2s ease infinite;
    filter: sepia(1) saturate(0.65);

    img {
      width: 100%;
      height: auto;
      vertical-align: middle;
    }

    @keyframes roll {
      from {
        transform: rotate(0);
      }
      to {
        transform: rotate(360deg);
      }
    }
  `
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      env: process.env.NODE_ENV,
      navOpen: false,
      cycle: undefined,
      currentPage:
        window.location.pathname === "/" ? "/home" : window.location.pathname
    };
  }

  fetchData = () => {
    const url =
      this.state.env === "development"
        ? "https://madam-nazar-location-api-2.herokuapp.com/today"
        : "https://madam-nazar-location-api.herokuapp.com/today";
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        "Access-Control-Allow-Origin": "*",
        "Accept-Encoding": "gzip, deflate",

        "Cache-Control": "no-cache",
        Connection: "keep-alive"
      }
    })
      .then(response => response.json())
      .then(json => {
        const data = json.data;
        console.log(data);
        this.setState({
          today: data.date,
          data: data.current_location.data,
          dataFor: data.current_location.dataFor,
          cycle: data.cycle,
          fetched: true
        });
        this.props.parent.setState({ cycle: data.cycle });

        console.log("state", this.state);
      })
      .catch(function(err) {
        console.log("error", err);
      });
  };

  componentDidMount() {
    ReactGA.initialize("UA-148400737-1");
    ReactGA.pageview(this.state.currentPage);
    this.fetchData();
    this.setState({
      readableDate: dateEvent.toLocaleDateString("us-EN", dateOptions)
    });
  }

  render() {
    const dataExists = this.state.data && this.state.data.location;
    return (
      <Router>
        <div
          className="App"
          css={css`
            z-index: 2;
            position: relative;

            h1 {
              display: inline-block;
            }
          `}
        >
          {dataExists && (
            <Frame day={this.state.readableDate} cycle={this.state.cycle} />
          )}
          <header
            className="App-header"
            css={css`
              height: auto;
              padding-bottom: 2em;
              padding-top: 100px;
              text-align: center;
              background: url(${require("./images/bgRip.png")}) repeat-x bottom -10px
                center;
            `}
          >
            <div
              className="d-flex ai-center jc-center md:d-none pos-fixed top-48 right-0 m-16 p-8 cu-pointer"
              css={css`
                border: 4px solid var(--Armadillo);
                background: url(${require("./images/bgMainSml.jpg")});
                border-image-slice: 10;
                border-image-source: url(${require("./images/frame.png")});
                border-style: solid;
                border-width: 6px;
                box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);

                z-index: 100;
                button {
                  font-weight: bold;
                }
              `}
            >
              <button
                className="m-0 va-middle"
                onClick={() => {
                  this.setState({ navOpen: !this.state.navOpen });
                }}
              >
                Menu
              </button>
            </div>
            <div>
              <div className="pv-32">
                <h1
                  css={css`
                    text-shadow: -1px 1px 0 black;
                    color: var(--Armadillo);
                  `}
                >
                  <span className="ph-8 d-inline md:d-none">
                    <span role="img" aria-label="emoji nazar">
                      🧿
                    </span>
                    <br />
                  </span>
                  <span
                    role="img"
                    aria-label="emoji nazar"
                    className="ph-8 d-none md:d-inline-block"
                  >
                    🧿
                  </span>
                  Madam Nazar Finder
                  <span
                    role="img"
                    aria-label="emoji nazar"
                    className="ph-8 d-none md:d-inline-block"
                  >
                    🧿
                  </span>
                </h1>
              </div>
              <ul
                className={`md:d-block md:pos-relative pos-fixed w-90p md:w-100p ${
                  this.state.navOpen ? "d-flex fxd-column jc-center" : "d-none"
                }`}
                css={css`
                  padding: 0;
                  margin: 0;
                  text-transform: uppercase;
                  text-decoration: none;
                  font-size: 1em;
                  letter-spacing: 0.045em;
                  list-style: none;
                  line-height: 1.5em;
                  height: 1.5em;
                  font-family: RDRrocks-sg;

                  border-color: #2e2e2e;
                  border-image-repeat: all;
                  border-image-slice: 14;
                  border-image-source: url(${require("./images/frame.png")});
                  border-style: solid;
                  border-width: 6px 0;

                  @media (max-width: 960px) {
                    height: 50vh;
                    background: var(--EcruWhite);
                    background: url(${require("./images/bgMainSml.jpg")});
                    border-width: 6px;
                    top: 0;
                    right: 0;
                    left: 0;
                    bottom: 0;
                    margin: auto;
                    z-index: 100;
                    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
                  }

                  li {
                    display: inline-block;
                    padding: 0 8px;
                  }
                  a {
                    text-decoration: none;
                    color: var(--Armadillo);
                  }
                `}
              >
                {navigation.map((item, index) => (
                  <li
                    key={item.link}
                    className="p-8 pl-8 mr-24 pos-relative md:d-flex ai-center jc-center w-100p md:w-auto"
                    css={
                      (index !== navigation.length - 1 &&
                        css`
                          &:after {
                            content: "";
                            display: block;
                            position: absolute;
                            background: url(${require("./images/bullet.png")})
                              no-repeat center center / contain;
                            width: 16px;
                            height: 16px;
                            top: 50%;
                            right: -16px;
                            transform: translateY(-50%);
                          }
                        `,
                      window.location.pathname === item.url &&
                        css`
                          color: red;
                        `)
                    }
                  >
                    {item.appLink === true ? (
                      <NavLink
                        to={item.url}
                        onClick={() => {
                          this.setState({ navOpen: false });
                          item.onclick();
                        }}
                        activeStyle={{ color: "var(--Tabasco)" }}
                        exact
                      >
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={`${item.image}`}
                            width={18}
                            className="va-middle mr-8"
                          />
                        ) : item.emoji ? (
                          <span role="img" arial-label="emoji" className="mr-8">
                            {item.emoji}
                          </span>
                        ) : null}
                        {item.title}
                      </NavLink>
                    ) : (
                      <a
                        href={item.url}
                        onClick={() => {
                          this.setState({ navOpen: false });
                          item.onclick();
                        }}
                        title={item.title}
                        rel={item.rel}
                        target={item.target}
                      >
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={`${item.image}`}
                            width={18}
                            className="va-middle mr-8"
                          />
                        ) : item.emoji ? (
                          <span role="img" arial-label="emoji" className="mr-8">
                            {item.emoji}
                          </span>
                        ) : null}
                        {item.title}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </header>
          <section
            css={css`
              max-width: 1200px;
              width: 90%;
              min-height: 50vh;
              margin: auto;
            `}
          >
            <Switch>
              <Route path="/map">
                <CollectorMap parent={this} />
              </Route>
              <Route path="/about">
                <About />
              </Route>
              <Route path="/cycles">
                <Cycles parent={this} cycle={this.state.cycle} />
              </Route>
              <Route path="/">
                {dataExists ? (
                  <Finder
                    parent={this}
                    env={this.state.env}
                    data={this.state.data}
                  />
                ) : (
                  <span css={styles.badge}>
                    <img src={require("./images/hat.png")} alt="loading" />
                  </span>
                )}
              </Route>
            </Switch>
          </section>
          <footer
            css={css`
              margin: 16px auto 0;
              height: 200px;
              text-align: center;
              background: url(${require("./images/bgOnline.png")}) repeat;
              position: relative;
              color: white;
              border-image-repeat: all;
              border-image-slice: 14;
              border-image-source: url(${require("./images/frame.png")});
              border-style: solid;
              border-width: 6px 0 0 0;
            `}
          >
            <div
              className="ta-center pos-relative"
              css={css`
                top: 60px;
              `}
            >
              <small
                css={css`
                  letter-spacing: 2px;
                  font-size: 16px;
                  font-family: "RDRLino-Regular";
                  line-height: 3;
                `}
              >
                For the{" "}
                <span role="img" aria-label="heart">
                  ❤️
                </span>{" "}
                of the RDO community
              </small>
              <br />
              <small
                css={css`
                  font-size: 14px;
                  margin-top: 16px;
                  display: inline-block;
                  opacity: 0.75;
                `}
              >
                Message to RockStar: Sorry for stealing the font.. :)
              </small>
            </div>
          </footer>
        </div>
      </Router>
    );
  }
}

export default App;
