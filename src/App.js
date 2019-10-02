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

import Finder from "./Finder";
import CollectorMap from "./CollectorMap";
import About from "./About";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { env: process.env.NODE_ENV, navOpen: false };
  }

  componentDidMount() {
    ReactGA.initialize("UA-148400737-1");
    ReactGA.pageview(window.location.pathname);
  }

  render() {
    return (
      <Router>
        <div
          className="App"
          css={css`
            height: 100%;
            z-index: 2;
            position: relative;
            overflow: auto;

            h1 {
              display: inline-block;
            }
          `}
        >
          <header
            className="App-header"
            css={css`
              height: auto;
              padding-bottom: 2em;
              text-align: center;
              background: url(${require("./images/bgRip.png")}) repeat-x bottom -10px
                center;
            `}
          >
            <div
              className="d-flex ai-center jc-center md:d-none pos-fixed top-0 right-0 m-16 p-8 cu-pointer"
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
                  font-size: 1.8em;
                  list-style: none;
                  line-height: 1.5em;
                  height: 1.5em;
                  font-family: RDRCatalogueBold-Bold;

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
                <CollectorMap />
              </Route>
              <Route path="/about">
                <About />
              </Route>
              <Route path="/">
                <Finder env={this.state.env} />
              </Route>
            </Switch>
          </section>
          <div
            css={css`
              margin: 16px auto;
              height: 200px;
              text-align: center;
              background: url(${require("./images/bgRip.png")}) repeat-x top
                center;
              position: relative;
              &::before {
                content: "";
                display: block;
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: url(${require("./images/bgMainSml.jpg")}) repeat
                  center top;
                top: 25px;
              }
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
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
