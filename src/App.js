/* eslint-disable jsx-a11y/anchor-is-valid */
/** @jsx jsx */
import React, { Component } from "react";
import * as ReactGA from "react-ga";
import { useHistory } from "react-router-dom";
import { css, jsx } from "@emotion/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Helmet } from "react-helmet";

import Finder from "./pages/Finder";
import CollectorMap from "./pages/CollectorMap";
import About from "./pages/About";
import Tweet from "./pages/Tweet";
import Maps from "./pages/Maps";
import Deck from "./pages/Deck";
import Resources from "./pages/Resources";

import Navigation from "./components/Navigation/Navigation";
import Footer from "./components/Footer/Footer";
import PatreonModal from "./components/PatreonModal/PatreonModal";
import Frame from "./components/Frame/Frame";
import NetworkInfo from "./components/NetworkInfo";
import AdComponent from "./components/AdComponent";
import { SupportBanner } from "./components/SupportBanner";

import { docCookies } from "./scripts/cookies";
import { isOnline, maxAgeToGMT } from "./scripts/helpers";

import styles from "./styles/globalStyles.css";

//// Define apis
import mockData from "./data/mock";
import { DEV_API, PROD_API, MOCK_API } from "./scripts/constants";
////

const currentEnv = process.env.NODE_ENV;
const patreonAdHidden = docCookies.getItem("patreon-ad-hidden") || false;
const todayDate = new Date().toDateString();

const URLHandler = (props) => {
  const history = useHistory();
  const url = new URL(window.location.href);
  if (url.searchParams.get("page")) {
    props.parent.setState({ reqUrl: url.searchParams.get("page") });
    history.push(`/${props.parent.state.reqUrl}`);
  }
  return null;
};

const bannerStyles = {
  root: css`
    background: url("${require("./images/bg-cowboys.jpg")}") repeat center top /
      600px;
    width: 100%;
    height: auto;
    left: 0;
    padding: 1em 0;
    position: fixed;
    bottom: 0;
    color: white;
    z-index: 999;
    border-color: #2e2e2e;
    text-shadow: 1px 1px 0 black;
    z-index: 999999999999999999999999;

    a {
      color: white;
    }

    @media (max-width: 960px) {
      margin: 0 auto;
      right: 0;
    }
  `,
};

const _parseJSON = (response) => {
  return response.text().then(function (text) {
    return text ? JSON.parse(text) : {};
  });
};
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage:
        window.location.pathname === "/" ? "/home" : window.location.pathname,
      navOpen: false,
      readableDate: todayDate,
      showPatreonAd: !patreonAdHidden,
      showPatreonModal: false,
      extraSupport: 1,
    };
  }

  fetchData = () => {
    const url = currentEnv === "development" ? DEV_API : PROD_API;

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        "Access-Control-Allow-Origin": "*",
        "Accept-Encoding": "gzip, deflate",

        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        const data = json.data;

        this.setState({
          today: json.valid_for,
          cycle: { ...json.cycle },
          data: { location: data.location, _id: data._id },
          dataFor: json.valid_for,
          fetched: true,
        });

        console.table(`today:${this.state.today}`, `Cycle:`, this.state.cycle);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  handlePatreonAdOpen = () => {
    this.setState({
      showPatreonAd: false,
      showPatreonModal: true,
    });
  };

  handlePatreonAdClose = () => {
    docCookies.setItem("patreon-ad-hidden", true, maxAgeToGMT(999));
    this.setState({
      showPatreonAd: false,
      showPatreonModal: false,
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

    if (currentEnv === "production") {
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
            apiUrl: isOnline === true ? DEV_API : MOCK_API,
          })
        : this.fetchData();
    }
  }

  render() {
    const dataExists = this.state.data && this.state.data.location;

    return dataExists ? (
      <Router>
        <URLHandler parent={this} />
        <div className="App" css={styles.root}>
          <Frame
            day={this.state.readableDate}
            cycle={dataExists && this.state.cycle}
            offsetTop={this.state.showPatreonAd}
          />
          <Navigation parent={this} navOpen={this.state.navOpen} />

          <AdComponent />

          {this.state.extraSupport === 1 && (
            <div className="ta-center" css={bannerStyles.root}>
              You love MadamNazar.io and consider supporting us? We need your
              help! Please check our{" "}
              <a href="https://support-madamnazario.surge.sh/">support page!</a>
              <button
                className="app-none bgc-transparent bdw-0 cursor-pointer"
                onClick={() => this.setState({ extraSupport: 0 })}
              >
                <img
                  src={require("./images/cancel-icon.svg")}
                  css={css`
                    width: 18px;
                  `}
                  className="va-middle ml-8"
                  alt="close icon"
                />
              </button>
            </div>
          )}

          <Switch>
            <Route path="/resources">
              <section className="pv-32" css={styles.wrapper}>
                <Resources />
              </section>
            </Route>
            <Route path="/map">
              <section className="pv-32" css={styles.wrapper}>
                <CollectorMap parent={this} />
              </section>
            </Route>
            <Route path="/maps">
              <section className="pv-32" css={styles.fullWidthWrapper}>
                <Maps parent={this} />
              </section>
            </Route>
            <Route path="/deck">
              <section className="pv-32" css={styles.wrapper}>
                <Deck parent={this} />
              </section>
            </Route>
            <Route path="/about">
              <section className="pv-32" css={styles.wrapper}>
                <About />
              </section>
            </Route>

            <Route path="/tweet">
              <section className="pv-32" css={styles.wrapper}>
                {dataExists && (
                  <Tweet
                    parent={this}
                    env={currentEnv}
                    dataFor={this.state.dataFor}
                    location={this.state.data && this.state.data.location}
                    imageNormal={
                      this.state.data && this.state.data.location.image
                    }
                    loaded={true}
                  />
                )}
              </section>
            </Route>
            <Route path="/">
              <section id="frame" className="pv-32" css={styles.wrapper}>
                {dataExists ? (
                  <Finder
                    parent={this}
                    env={currentEnv}
                    data={this.state.data}
                  />
                ) : (
                  <span css={styles.badge}>
                    <img src={require("./images/hat.png")} alt="loading" />
                  </span>
                )}
              </section>
            </Route>
          </Switch>

          <Footer parent={this} />

          {currentEnv === "development" && <NetworkInfo />}

          {this.state.showPatreonAd && (
            <SupportBanner
              onClose={this.handlePatreonAdClose}
              onOpen={this.handlePatreonAdOpen}
            />
          )}

          {this.state.showPatreonModal && (
            <PatreonModal onClose={this.handlePatreonAdClose} />
          )}
        </div>
      </Router>
    ) : (
      <div
        css={css`
          position: absolute;
          z-index: 9999999999999;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        `}
      >
        <Frame
          day={this.state.readableDate}
          cycle={dataExists && this.state.cycle}
          offsetTop={this.state.showPatreonAd}
        />

        <span css={styles.badge}>
          <img src={require("./images/hat.png")} alt="loading" />
        </span>
      </div>
    );
  }
}

export default App;
