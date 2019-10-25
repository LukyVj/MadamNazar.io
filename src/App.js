/* eslint-disable jsx-a11y/anchor-is-valid */
/** @jsx jsx */
import React, { Component } from "react";
import ReactGA from "react-ga";
import { css, jsx } from "@emotion/core";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";

import Finder from "./pages/Finder";
import CollectorMap from "./pages/CollectorMap";
import About from "./pages/About";
import Sachel from "./pages/Sachel";
import Tweet from "./pages/Tweet";
import Maps from "./pages/Maps";
import Resources from "./pages/Resources";
import PatreonModal from "./components/PatreonModal/PatreonModal";
import Frame from "./components/Frame/Frame";

import { docCookies } from "./scripts/cookies";
import { isOnline, getCycleDay } from "./scripts/helpers";
import { WEBSITE_NAME } from "./scripts/constants";

import styles from "./styles/globalStyles.css";

import frame from "./images/frame.png";

import { navigation } from "./data/navigation";

//// Define apis
import mockData from "./data/mock";

const devApi = "https://madam-nazar-location-api-2.herokuapp.com/today";
const prodApi = "https://madam-nazar-location-api.herokuapp.com/today";

const dateEvent = new Date();
const dateOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric"
};
const todayDate = dateEvent.toDateString("us-EN", dateOptions);

const apiDefined = isOnline === true ? `hello ${devApi}` : "./data/mock.js";

const NetworkInfo = () =>
  process.env.NODE_ENV === "development" && (
    <>
      <div
        css={css`
          background: ${isOnline
            ? "rgba(120, 200, 120)"
            : "rgba(255, 100, 100)"};
          color: white;
          position: fixed;
          z-index: 999999999;
          bottom: 0;
          left: 0;
          width: 100%;
          padding: 4px;
          font-size: 14px;
        `}
      >
        The site is running locally, {isOnline === true ? "with" : "without"} an
        internet access <br /> The data are fetched from {apiDefined}
      </div>
    </>
  );

const SupportBanner = parent => (
  <div
    className="pos-fixed pv-16 ta-center d-flex ai-cente jc-center fsz-12 md:fsz-16"
    css={css`
      top: 84px;
      background: url("${require("./images/rockstar-rdr2-banner.png")}") repeat center center /
        800px;
      width: 100%;
      left: 0;
      color: white;
      z-index: 999;
      top: 0;
      
    border-color: #2e2e2e;
    border-image-repeat: all;
    border-image-slice: 14;
    border-image-outset: 3px;
    border-image-source: url(${frame});
    border-style: solid;
    border-width: 6px 0;
  
    `}
  >
    <div className="maw-600 pos-relative m-auto">
      {" "}
      <span
        className="cursor-pointer"
        css={css`
          color: white;
          text-decoration: none;
        `}
        onClick={() => {
          parent.parent.setState({ showPatreonAbout: true, patreonAd: false });
        }}
      >
        <span role="img" aria-label="emoji pink double hearts">
          💕
        </span>{" "}
        <b>Support {WEBSITE_NAME}! Click to learn more</b> 
        <span role="img" aria-label="emoji pink double hearts">
          💕
        </span>{" "}
      </span>
      <span>
        <button
          className="app-none bdw-0 bgc-transparent p-0 m-0 va-middle cursor-pointer"
          onClick={() => {
            docCookies.setItem("patreon-ad", "false", 999);
            parent.parent.setState({ updated: true, patreonAd: false });
          }}
        >
          <img
            src={require("./images/cancel-icon.svg")}
            className="va-middle"
            alt="close icon"
          />
        </button>
      </span>
    </div>
  </div>
);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      env: process.env.NODE_ENV,
      navOpen: false,
      readableDate: todayDate,
      cycle: getCycleDay(todayDate),
      showPatreonBanner: true,
      currentPage:
        window.location.pathname === "/" ? "/home" : window.location.pathname
    };
  }

  fetchData = () => {
    const url = this.state.env === "development" ? devApi : prodApi;

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
        this.setState({
          today: data.date,
          data: data.current_location.data,
          dataFor: data.current_location.dataFor,
          cycle: data.cycle,
          fetched: true
        });
      })
      .catch(function(err) {
        console.log("error", err);
      });
  };

  componentDidMount() {
    // Hello safari ////////////////////////////
    ////////////////////////////////////////////
    // On safari the map on /map cannot load
    // because of a missing cookie.
    // This emulates the needed cookie.
    // I know, it's not ideal and might break
    // things, but hey, you do what you can :)
    docCookies.setItem("removed-items", "a;b");
    docCookies.setItem("removed-markers-daily", "true");
    docCookies.setItem("removed-markers-daily", "true");
    if (
      !docCookies.getItem("patreon-ad") &&
      docCookies.getItem("patreon-ad") !== "false"
    ) {
      document.cookie = "patreon-ad=true";
    }

    const e = document.cookie
      .split(";")
      .find(cookie => cookie === " patreon-ad=true");

    docCookies.getItem("patreon-ad") === "true"
      ? this.setState({ patreonAd: true })
      : this.setState({ patreonAd: false });

    if (this.state.env === "production") {
      ReactGA.initialize("UA-148400737-1");
      ReactGA.pageview(this.state.currentPage);
      this.fetchData();
    } else {
      isOnline === false && mockData !== false
        ? this.setState({
            today: mockData.date,
            data: mockData.current_location.data,
            dataFor: mockData.current_location.dataFor,
            cycle: mockData.cycle,
            fetched: true,
            apiUrl: isOnline === true ? `hello ${devApi}` : "./data/mock.js"
          })
        : this.fetchData();
    }
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
          <NetworkInfo />
          {this.state.showPatreonAbout === true && (
            <PatreonModal parent={this} />
          )}

          <Frame
            day={this.state.readableDate}
            cycle={this.state.cycle}
            offsetTop={this.state.patreonAd}
          />

          <header
            className="App-header"
            css={css`
              height: auto;
              padding-bottom: 2em;
              padding-top: ${this.state.patreonAd === true ? "160px" : "100px"};
              text-align: center;
              position: relative;
              &:after {
                position: absolute;
                width: 100%;
                height: 100%;
                content: "";
                display: block;
                background: url(${require("./images/bgRip.png")}) repeat-x
                  bottom 10px center;
              }
            `}
          >
            {this.state.patreonAd === true && <SupportBanner parent={this} />}

            <div
              className="d-flex ai-center jc-center md:d-none pos-fixed top-48 right-0 m-16 p-8 cu-pointer"
              css={css`
                border: 4px solid var(--Armadillo);
                background: url(${require("./images/bgMainSml.jpg")});
                border-image-slice: 10;
                border-image-outset: 3px;
                border-image-source: url(${require("./images/frame.png")});
                border-style: solid;
                border-width: 6px;
                box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
                z-index: 100;
                left: 0;
                right: 0;
                max-width: 100px;
                margin: auto;
                top: ${this.state.patreonAd === true ? "70px" : "12px"};

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
              <div className="pv-32 pos-relative z-10">
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
                css={styles.modal}
              >
                {navigation.map((item, index) => (
                  <li
                    key={item.link}
                    className="pv-8 md:pv-0 md:pl-8 md:pr-8 md:mr-24 pos-relative md:d-flex ai-center jc-center md:w-auto"
                    css={[
                      index !== navigation.length - 1 &&
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

                            @media (max-width: 960px) {
                              display: none;
                            }
                          }
                        `,
                      window.location.pathname === item.url &&
                        css`
                          color: red;
                        `,
                      css`
                        @media (max-width: 960px) {
                          font-size: 32px;
                        }
                      `
                    ]}
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
            id="frame"
            className="pv-32"
            css={css`
              max-width: 1200px;
              width: 90%;
              min-height: 50vh;
              margin: auto;
            `}
          >
            <Switch>
              <Route path="/resources">
                <Resources />
              </Route>
              <Route path="/map">
                <CollectorMap parent={this} />
              </Route>
              <Route path="/maps">
                <Maps parent={this} />
              </Route>
              <Route path="/about">
                <About />
              </Route>
              <Route path="/sachel">
                {dataExists && (
                  <Sachel parent={this} cycle={this.state.cycle} />
                )}
              </Route>
              <Route path="/tweet">
                {dataExists && (
                  <Tweet
                    parent={this}
                    env={this.state.env}
                    dataFor={this.state.dataFor}
                    location={this.state.data && this.state.data.location}
                    imageNormal={
                      this.state.data &&
                      this.state.data.location.image.normal.full
                    }
                    imageNegative={
                      this.state.data &&
                      this.state.data.location.image.negative.full
                    }
                    imageTilt={
                      this.state.data &&
                      this.state.data.location.image.tilt_shift.full
                    }
                    loaded={true}
                  />
                )}
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
              border-image-outset: 3px;
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
                  font-family: "RDRrocks-sg";
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
