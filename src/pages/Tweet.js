/** @jsx jsx */
import React, { Component } from "react";
import { jsx } from "@emotion/core";
import ReactGA from "react-ga";

import { capitalize, formatDateTweet } from "../scripts/helpers";
import styles from "./Tweet.css";
import Infos from "../components/Infos";

class Tweet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      selectedImg: "",
      initial_tweet: `🚩 Today ${formatDateTweet(
        new Date(Date.parse(this.props.dataFor))
      )} 📅, Madam Nazar was found in ${capitalize(
        this.props.location.region.precise
      )} in ${capitalize(
        this.props.location.region.name
      )}, Find me on https://madamnazar.io #RedDeadRedemption2 #rdr2 #madamnazar #RDOnline #FrontierPursuits via @MadamNazarIO`
    };
    this.textInput = React.createRef();
  }

  componentDidMount() {
    this.props.parent.setState({ currentPage: window.location.pathname });
    this.setState({
      loaded: true,
      imagesReady: this.props.location.image && true
    });
    ReactGA.pageview("/tweet");
  }
  focusTextInput() {
    this.textInput.current.focus();
  }
  cleanTweetForImageSelection(string) {
    return string.split("🗺➡")[0];
  }
  render() {
    return (
      <Infos>
        <h2 className="ta-center mt-48">
          Help your Twitter followers to find Madam Nazar
        </h2>

        <h3>
          <span className="label">1</span> Edit your tweet:
        </h3>
        <div className="d-grid g-2 mb-32">
          <textarea
            id="pretweet"
            className="w-100p h-100p app-none fsz-18 bgc-transparent p-8 h-100 d-block"
            css={styles.textarea}
            value={this.state.initial_tweet}
            ref={this.textInput}
            onClick={() => {
              ReactGA.event({
                category: "click.textarea",
                action: "Click textarea on /tweet"
              });
              this.focusTextInput();
            }}
            onLoad={() => {
              this.setState({
                text_tweet: this.textInput.current.value
              });
            }}
            onInput={() => {
              this.setState({ initial_tweet: this.textInput.current.value });
              ReactGA.event({
                category: "type.textarea",
                action: "Input in textarea on /tweet"
              });
            }}
          />
          <div className="md:pl-16 h-100p">
            <div className="p-8 h-100p" css={styles.tweet}>
              {this.state.initial_tweet}
            </div>
          </div>
        </div>
        <div className="d-grid md:g-2">
          <div className="d-grid md:g-3">
            <div className="w-100p gcstart-1 gcend-4">
              <h3>
                <span className="label">2</span> Pick an image:
              </h3>
            </div>
            <div className="p-8 cursor-pointer" css={styles.mapBox}>
              <img
                src={this.props.imageNormal}
                className="w-100p"
                alt="Normal view"
                onClick={() => {
                  this.setState({
                    initial_tweet: `${this.cleanTweetForImageSelection(
                      this.textInput.current.value
                    )} 🗺➡ ${this.props.imageNormal}`
                  });
                  ReactGA.event({
                    category: "click.tweet.image",
                    action: "Click first image for tweet"
                  });
                }}
              />
            </div>
          </div>
          <div className="ta-center">
            <h3>
              <span className="label">3</span> Finally:
            </h3>
            <a
              css={styles.button}
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                this.state.initial_tweet
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
      </Infos>
    );
  }
}

export default Tweet;
