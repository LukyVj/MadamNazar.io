/** @jsx jsx */
import React, { Component } from "react";
import Finder from "./Finder";
import ReactGA from "react-ga";

import { css, jsx } from "@emotion/core";

import { isBrowser, rudr_favorite } from "./scripts/helpers";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      soundOn:
        isBrowser && window.localStorage.getItem("soundOn") === false
          ? window.localStorage.getItem("soundOn")
          : true
    };
  }

  componentDidMount() {
    ReactGA.initialize("UA-148400737-1");
    ReactGA.pageview(window.location.pathname);
  }

  componentDidUpdate() {}

  render() {
    return (
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
              <h1>Nazar 🧿 Finder</h1>
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
              <li>
                <a
                  href="javascript:void(0)"
                  onClick={() => rudr_favorite(this)}
                >
                  <img
                    src={require("./images/star.svg")}
                    width={18}
                    className="va-middle"
                  />{" "}
                  Add to favorites
                </a>{" "}
              </li>
              <li>
                🐦
                <a href="https://twitter.com/intent/tweet?text=%F0%9F%A7%BF%20NazarFinder%20-%20Get%20the%20updated%20location%20of%20Madam%20Nazar%20in%20Red%20Dead%20Redemption%202%20Online%20https%3A%2F%2Fnazarfinder.surge.sh%20from%20%40lukyvj">
                  Tweet about it!
                </a>
              </li>
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
          <Finder />
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
              Made by <a href="https://twitter.com/lukyvj">@LukyVj</a> 🤠 - For
              the ❤️ of the RDO community
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
              <a href="https://documenter.getpostman.com/view/6602370/SVtN3rnY">
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
    );
  }
}

export default App;
