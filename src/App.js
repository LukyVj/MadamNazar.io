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

    this.state = { env: process.env.NODE_ENV };
  }

  componentDidMount() {
    ReactGA.initialize("UA-148400737-1");
    ReactGA.pageview(window.location.pathname);
  }

  componentDidUpdate() {}

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
            <div>
              <div className="pv-32">
                <h1
                  css={css`
                    text-shadow: -1px 1px 0 black;
                  `}
                >
                  <span role="img" aria-label="emoji nazar" className="ph-8">
                    🧿
                  </span>
                  Madam Nazar Finder
                  <span role="img" aria-label="emoji nazar" className="ph-8">
                    🧿
                  </span>
                </h1>
              </div>
              <ul
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
                    display: none;
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
                    className="p-8 pl-8 mr-24 pos-relative d-flex ai-center jc-center"
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
                        onClick={item.onclick}
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
                        onClick={item.onclick}
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
