/* eslint-disable jsx-a11y/anchor-is-valid */
/** @jsx jsx */
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Finder from "./Finder";
import CollectorMap from "./CollectorMap";
import ReactGA from "react-ga";
import { css, jsx } from "@emotion/core";

import { isBrowser, rudr_favorite } from "./scripts/helpers";
import { navigation } from "./data/navigation";

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
              height: 200px;
              text-align: center;
              background: url(${require("./images/bgRip.png")}) repeat-x bottom -10px
                center;
            `}
          >
            <div>
              <div>
                <h1>
                  Nazar{" "}
                  <span role="img" aria-label="emoji nazar">
                    🧿
                  </span>{" "}
                  Finder
                </h1>
              </div>
              <ul
                css={css`
                  text-transform: uppercase;
                  text-decoration: none;
                  font-size: 16px;
                  list-style: none;

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
                {navigation.map(
                  item =>
                    console.log(item) || (
                      <li key={item.link} className="p-8">
                        [ 
                        <Link to={item.url} onClick={item.onclick}>
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={`${item.image}`}
                              width={18}
                              className="va-middle mr-8"
                            />
                          ) : item.emoji ? (
                            <span
                              role="img"
                              arial-label="emoji"
                              className="mr-8"
                            >
                              {item.emoji}
                            </span>
                          ) : null}
                          {item.title}
                        </Link>
                         ]
                      </li>
                    )
                )}
              </ul>
            </div>
          </header>
          <section
            css={css`
              max-width: 1200px;
              width: 90%;
              margin: auto;
            `}
          >
            <Switch>
              <Route path="/map">
                <CollectorMap />
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
                Made by{" "}
                <a
                  href="https://twitter.com/lukyvj"
                  onClick={() => {
                    ReactGA.event({
                      category: "click.link",
                      action: "Click on LukyVj Twitter profile"
                    });
                  }}
                >
                  @LukyVj
                </a>{" "}
                🤠 - For the ❤️ of the RDO community
              </small>
              <br />
              <small
                css={css`
                  font-size: 16px;
                  margin-top: 16px;
                  display: inline-block;
                `}
              >
                Made using the unofficial{" "}
                <a
                  href="https://documenter.getpostman.com/view/6602370/SVtN3rnY"
                  onClick={() => {
                    ReactGA.event({
                      category: "click.link",
                      action: "Click on API link"
                    });
                  }}
                >
                  Madam Nazar Location Api
                </a>
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
