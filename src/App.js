/* eslint-disable jsx-a11y/anchor-is-valid */
/** @jsx jsx */
import React, { Component } from "react";
import ReactGA from "react-ga";
import { useHistory } from "react-router-dom";
import { css, jsx } from "@emotion/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

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
import { SupportBanner } from "./components/SupportBanner";

import { docCookies } from "./scripts/cookies";
import { isOnline, getCycleDay, maxAgeToGMT } from "./scripts/helpers";

import styles from "./styles/globalStyles.css";

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
////

const NetworkInfo = () => (
  <>
    <div
      className="p-8 ta-center bxs-default"
      css={css`
        background: ${isOnline ? "rgba(120, 200, 120)" : "rgba(255, 100, 100)"};
        color: white;
        position: fixed;
        z-index: 999999999;
        bottom: 0;
        width: 300px;
        right: 0;
        bottom: 0;
        color: white;
        z-index: 999999999999999999999999;
        border-radius: 14px;
        margin: 16px;
        font-size: 14px;
        text-shadow: 1px 1px 10px rgba(0, 0, 0, 0.8);
      `}
    >
      <p className="p-0 mv-8">
        Running locally, {isOnline === true ? "with" : "without"} an internet
        access{" "}
      </p>
      <p className="p-0 mv-8">
        Data fecthed from <a href={apiDefined}>{apiDefined}</a>
      </p>
    </div>
  </>
);

const URLHandler = props => {
  let history = useHistory();
  const url = new URL(window.location.href);
  if (url.searchParams.get("page")) {
    props.parent.setState({ reqUrl: url.searchParams.get("page") });
    history.push(`/${props.parent.state.reqUrl}`);
  }
  return null;
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      env: process.env.NODE_ENV,
      navOpen: false,
      readableDate: todayDate,
      cycle: getCycleDay(todayDate),
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

    if (!docCookies.getItem("patreon-ad")) {
      docCookies.setItem("patreon-ad", "true", maxAgeToGMT(150));
    }

    docCookies.getItem("patreon-ad") === "true"
      ? this.setState({ showPatreonAd: true })
      : docCookies.getItem("patreon-ad") === "false"
      ? this.setState({ showPatreonAd: false })
      : this.setState({ updated: true });

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
        <URLHandler parent={this} />
        <div className="App" css={styles.root}>
          {process.env.NODE_ENV === "development" && <NetworkInfo />}
          {this.state.showPatreonAd === true && <SupportBanner parent={this} />}
          {this.state.showPatreonAbout === true && (
            <PatreonModal parent={this} />
          )}

          <Frame
            day={this.state.readableDate}
            cycle={this.state.cycle}
            offsetTop={this.state.showPatreonAd}
          />
          <Navigation parent={this} navOpen={this.state.navOpen} />

          <section id="frame" className="pv-32" css={styles.wrapper}>
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
              <Route path="/deck">
                <Deck parent={this} />
              </Route>
              <Route path="/about">
                <About />
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
          <Footer parent={this} />
        </div>
      </Router>
    );
  }
}

export default App;
