/** @jsx jsx */
import React, { Component } from "react";
import { css, jsx } from "@emotion/core";

import { capitalize, formatDateTweet } from "./scripts/helpers";
import ReactGA from "react-ga";

class Tweet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      selectedImg: ""
    };
  }

  componentDidMount() {
    this.props.parent.setState({ currentPage: window.location.pathname });
    this.setState({
      loaded: true,
      imagesReady: this.props.location.image && true
    });
  }

  render() {
    const tweet_text = `🚩 Today ${formatDateTweet(
      new Date(Date.parse(this.props.dataFor))
    )} 📅, Madam Nazar was found in ${capitalize(
      this.props.location.region.precise
    )} in ${capitalize(
      this.props.location.region.name
    )}, Find me on https://madamnazar.io #RedDeadRedemption2 #rdr2 #madamnazar #RDOnline #FrontierPursuits ${this
      .state.selectedImg !== undefined &&
      this.state.selectedImg !== false &&
      this.state.selectedImg} via @finderNazar`;
    return (
      <div>
        <h2 className="ta-center">
          Help your Twitter followers to find Madam Nazar
        </h2>
        <h3>First, edit your tweet:</h3>
        <textarea
          value={tweet_text}
          className="w-100p app-none fsz-18 bgc-transparent p-8 h-100 d-block"
          css={css`
            border-image-repeat: all;
            border-image-slice: 14;
            border-image-source: url(${require("./images/frame.png")});
            border-style: solid;
            border-width: 6px;
            background: url(${require("./images/bgOnline.png")});
            color: white;
            max-width: calc(100% - 32px);
          `}
          onClick={() =>
            ReactGA.event({
              category: "click.textarea",
              action: "Click textarea on /tweet"
            })
          }
          onInput={() =>
            ReactGA.event({
              category: "type.textarea",
              action: "Input in textarea on /tweet"
            })
          }
        />
        <h3>Then pick an image:</h3>
        <div className="d-grid md:g-3">
          <div
            className="p-8 cursor-pointer"
            css={css`
              &:hover {
                border-image-repeat: all;
                border-image-slice: 14;
                border-image-source: url(${require("./images/frame.png")});
                border-style: solid;
                border-width: 6px;
              }
            `}
          >
            <img
              src={this.props.imageNormal}
              className="w-100p"
              alt="Normal view"
              onClick={() => {
                this.setState({ selectedImg: this.props.imageNormal });
                ReactGA.event({
                  category: "click.tweet.image",
                  action: "Click first image for tweet"
                });
              }}
            />
          </div>
          <div
            className="p-8 cursor-pointer"
            css={css`
              &:hover {
                border-image-repeat: all;
                border-image-slice: 14;
                border-image-source: url(${require("./images/frame.png")});
                border-style: solid;
                border-width: 6px;
              }
            `}
          >
            <img
              src={this.props.imageNegative}
              alt="Negative view"
              className="w-100p"
              onClick={() => {
                this.setState({ selectedImg: this.props.imageNegative });
                ReactGA.event({
                  category: "click.tweet.image",
                  action: "Click second image for tweet"
                });
              }}
            />
          </div>
          <div
            className="p-8 cursor-pointer"
            css={css`
              &:hover {
                border-image-repeat: all;
                border-image-slice: 14;
                border-image-source: url(${require("./images/frame.png")});
                border-style: solid;
                border-width: 6px;
              }
            `}
          >
            <img
              src={this.props.imageTilt}
              alt="Tilt shifted view"
              className="w-100p"
              onClick={() => {
                this.setState({ selectedImg: this.props.imageTilt });
                ReactGA.event({
                  category: "click.tweet.image",
                  action: "Click third image for tweet"
                });
              }}
            />
          </div>
        </div>
        <div>
          <h3>Finally:</h3>
          <a
            css={css`
              background: rgba(0, 0, 0, 0.78);
              color: var(--EcruWhite);
              font-size: 28px;
              padding: 10px 20px;
              border-radius: 100px;
              text-decoration: none;
              margin: 2em auto;
              max-width: 200px;
              display: block;
              text-align: center;

              &:hover {
                background: var(--Tabasco);
              }
            `}
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              tweet_text
            )}`}
            onClick={() => {
              ReactGA.event({
                category: "click.tweet.link",
                action: "Tweeted position"
              });
            }}
          >
            Tweet it !
          </a>
        </div>
      </div>
    );
  }
}

export default Tweet;
