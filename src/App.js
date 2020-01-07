/* eslint-disable jsx-a11y/anchor-is-valid */
/** @jsx jsx */
import React, { Component } from "react";
import * as ReactGA from "react-ga";
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
import NetworkInfo from "./components/NetworkInfo";
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

const URLHandler = props => {
  const history = useHistory();
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
      currentPage:
        window.location.pathname === "/" ? "/home" : window.location.pathname,
      navOpen: false,
      readableDate: todayDate,
      showPatreonAd: !patreonAdHidden,
      showPatreonModal: false
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
        Connection: "keep-alive"
      }
    })
      .then(response => response.json())
      .then(json => {
        const { date, current_location = {} } = json.data;


        this.setState({
          today: date,
          data: current_location.data,
          dataFor: current_location.dataFor,
          fetched: true
        });
      })
      .catch(err => {
        console.log("error", err);
      });
  };

  handlePatreonAdOpen = () => {
    this.setState({
      showPatreonAd: false,
      showPatreonModal: true
    });
  };

  handlePatreonAdClose = () => {
    docCookies.setItem("patreon-ad-hidden", true, maxAgeToGMT(999));
    this.setState({
      showPatreonAd: false,
      showPatreonModal: false
    });
  };

  getNewCycle = () => {
    fetch("https://jeanropke.github.io/RDR2CollectorsMap/data/cycles.json?nocache=999999")
      .then(response => response.json())
      .then(json => {
        this.setState({newCycle: json.current})
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
    this.getNewCycle();

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
            apiUrl: isOnline === true ? DEV_API : MOCK_API
          })
        : this.fetchData();
    }
  }

  render() {
    const dataExists = this.state.data && this.state.data.location;
    console.log(this.state)
    return (
      <Router>
        <URLHandler parent={this} />
        <div className="App" css={styles.root}>
          <Frame
            day={this.state.readableDate}
            cycle={this.state.newCycle !== undefined && this.state.newCycle}
            offsetTop={this.state.showPatreonAd}
          />
          <Navigation parent={this} navOpen={this.state.navOpen} />

          <Switch>
            <Route path="/resources">
              <section id="frame" className="pv-32" css={styles.wrapper}>
                <Resources />
              </section>
            </Route>
            <Route path="/map">
              <section id="frame" className="pv-32" css={styles.wrapper}>
                <CollectorMap parent={this} />
              </section>
            </Route>
            <Route path="/maps">
              <section
                id="frame"
                className="pv-32"
                css={styles.fullWidthWrapper}
              >
                <Maps parent={this} />
              </section>
            </Route>
            <Route path="/deck">
              <section id="frame" className="pv-32" css={styles.wrapper}>
                <Deck parent={this} />
              </section>
            </Route>
            <Route path="/about">
              <section id="frame" className="pv-32" css={styles.wrapper}>
                <About />
              </section>
            </Route>

            <Route path="/tweet">
              <section id="frame" className="pv-32" css={styles.wrapper}>
                {dataExists && (
                  <Tweet
                    parent={this}
                    env={currentEnv}
                    dataFor={this.state.dataFor}
                    location={this.state.data && this.state.data.location}
                    imageNormal={
                      this.state.data &&
                      this.state.data.location.image.normal.full
                    }
                    imageTilt={
                      this.state.data &&
                      this.state.data.location.image.tilt_shift.full
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
    );
  }
}

export default App;
