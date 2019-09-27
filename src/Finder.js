/** @jsx jsx */
import React, { Component } from "react";
import { css, jsx } from "@emotion/core";
import RDAppear from "./RDAppear";
import Map from "./Map";
import { isConditional } from "@babel/types";

const styles = {
  posterGrid: css``,
  posterWrapper: css`
    filter: drop-shadow(0 5px 5px rgba(0, 0, 0, 0.4));
  `,
  posterLayout: css`
    position: relative;

    margin: auto;
    border-radius: 138px;
    z-index: 2;

    .header {
      text-align: center;
    }

    @media (min-width: 960px) {
      padding: 0 2em;
    }
  `,
  badge: css`
    width: 120px;
    height: 120px;
    border-radius: 100px;
    border: 4px solid var(--Armadillo);
    background: var(--Twine);
    box-shadow: 0 0 32px rgba(0, 0, 0, 0.2);
    display: block;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 100px auto;
    animation: roll 2s ease infinite;
    filter: sepia(1) saturate(0.65);

    img {
      width: 100%;
      height: auto;
      vertical-align: middle;
    }

    @keyframes roll {
      from {
        transform: rotate(0);
      }
      to {
        transform: rotate(360deg);
      }
    }
  `,
  avatar: css`
    animation: blur 5s forwards;
    height: 100px;
    max-height: 640px;
    max-width: 640px;
    position: relative;
    width: 100px;
    overflow: hidden;

    div {
      height: 100%;
      position: absolute;
      width: 100%;
    }

    .normal {
      background-size: cover;
    }

    .invert {
      animation: mask 5s steps(69) forwards;
      background-size: cover;
      filter: invert(1) grayscale(1);
      -webkit-mask: url(${require("./images/sheet.png")});
      -webkit-mask-size: 7000% 100%;
      mask: url(${require("./images/sheet.png")});
      mask-size: 7000% 100%;
    }

    @keyframes blur {
      from {
        filter: blur(3px);
        opacity: 0;
      }
      to {
        filter: blur(0px);
        opacity: 1;
      }
    }

    @keyframes mask {
      from {
        -webkit-mask-position: 0% 0;
        mask-position: 0% 0;
      }
      to {
        -webkit-mask-position: 100% 0;
        mask-position: 100% 0;
      }
    }
  `
};

const InfoBox = props => {
  const avatarCSS = css`
    #normal,
    #invert {
      background-image: url(${props.author_avatar});
    }
  `;
  const text = props.text.split("https://")[0];
  return (
    <>
      <div
        className={`modal pos-absolute w-800 h-auto bgc-mars-0 left-0 right-0 top-0 bot-0 m-auto z-max bxs-default p-16 ${
          props.parent.state.modal === true ? "d-block" : "d-none"
        }`}
        css={css`
          z-index: 9999999999;
          border: 4px solid var(--Armadillo);
          background: var(--Armadillo);
          box-shadow: 0 0 32px rgba(0, 0, 0, 0.2);
          max-width: 90%;
          max-height: 90%;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          margin: auto;
        `}
      >
        <button
          onClick={() => {
            props.parent.setState({
              modal: !props.parent.state.modal,
              modalImage: null
            });
          }}
        >
          Close window
        </button>
        <img
          src={props.parent.state.modalImage}
          className="w-100p h-100p obf-contain obp-center"
          alt={props.parent.state.modalImage}
          onClick={() => {
            props.parent.setState({
              modal: !props.parent.state.modal,
              modalImage: null
            });
          }}
        />
      </div>

      <div css={styles.posterWrapper}>
        <div css={[avatarCSS, styles.posterGrid, styles.posterLayout]}>
          <div
            className="header"
            css={css`
              margin-bottom: 2em;
            `}
          >
            <h3 className="news-title">Mme Nazar was found!</h3>
            <div class="subhead">
              <time
                css={css`
                  letter-spacing: 2px;
                `}
              >
                {props.found_on.split(" ")[0]} {props.found_on.split(" ")[1]} 
                {props.found_on.split(" ")[2]} {props.found_on.split(" ")[5]}
              </time>
            </div>
          </div>

          <section className="d-grid lg:g-2 pv-32 pos-relative">
            <div className="pos-relative">
              <span>Found by: </span> <br />
              <div
                className="h-100"
                css={css`
                  line-height: 100px;
                `}
              >
                <span className="pos-relative d-inline-block va-middle">
                  <RDAppear
                    width={58}
                    height={58}
                    image={props.author_avatar}
                    childrenStyle={css`
                      height: calc(58px - 8px) !important;
                      width: calc(58px - 8px) !important;
                      border-radius: 100px;
                      border: 4px solid var(--Armadillo);
                      overflow: hidden;
                    `}
                  />
                </span>
                <h2
                  className="m-0 p-0 pl-24"
                  css={css`
                    display: inline-block;
                    font-size: 38px;
                    letter-spacing: 2px;
                    vertical-align: middle;
                    text-shadow: -1px 1px 0 black;
                  `}
                >
                  <a href={`https://twitter.com/${props.author}`}>
                    @{props.author}
                  </a>
                </h2>
              </div>
              <div>
                <p>{text}</p>
                <a href={props.link}>{props.link}</a>
              </div>
            </div>

            <div className={props.media.length !== 1 && "d-grid lg:g-2"}>
              {props.media.map(media => (
                <div
                  className="cursor-pointer"
                  css={css`
                    padding: 8px;
                  `}
                >
                  <RDAppear
                    image={media.media_url_https}
                    width={props.media.length === 1 ? 400 : 300}
                    height={props.media.length === 1 ? 400 : 300}
                    onClick={() => {
                      props.parent.setState({
                        modal: true,
                        modalImage: media.media_url_https
                      });
                    }}
                    childrenStyle={css`
                      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.4);
                      transform: rotate(-0.3deg);
                      filter: sepia(1) saturate(0.65);

                      @media (max-width: 960px) {
                        width: 100% !important;
                      }
                    `}
                    css={css`
                      @media (max-width: 960px) {
                        width: 100% !important;
                      }
                    `}
                  />
                </div>
              ))}
            </div>
          </section>
          <section>
            {props.hashtags.map(ht => {
              if (ht.text.startsWith("p")) {
                let loc = ht.text.substring(
                  ht.text.lastIndexOf("p") + 1,
                  ht.text.lastIndexOf("x")
                );
                return <Map localisation={loc} />;
              }
            })}
          </section>
        </div>
      </div>
    </>
  );
};

class Finder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      failed: null,
      modal: false,
      mapLoc: null
    };
  }

  fetchData = () => {
    fetch(
      "https://cors-anywhere.herokuapp.com/https://api.twitter.com/1.1/search/tweets.json?q=%23NazarFinder&tweet_mode=extended",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          "Access-Control-Allow-Origin": "*",
          "Accept-Encoding": "gzip, deflate",
          Authorization:
            "Bearer AAAAAAAAAAAAAAAAAAAAABrO0AAAAAAA8qTMsAShpS43PMvZweECxqTZ728%3DFF6BCPcE2CBuqYeTo00Z88tQxNIPWerPb7fEzmpaUE75nzF8LO",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
          Cookie:
            "personalization_id='v1_OHHCF5O+kmx2t+clOEL/6Q=='; guest_id=v1%3A156699205346221382",
          Host: "api.twitter.com'",
          "cache-control": "no-cache"
        }
      }
    )
      .then(response => response.json())
      .then(data => {
        if (
          data.statuses[0].user.screen_name === "iamfabriceg" ||
          data.statuses[0].user.screen_name === "LukyVJ"
        ) {
          this.setState({ data });
        }
      })
      .catch(function(err) {
        console.log("error", err);
      });
  };

  componentDidMount() {
    this.fetchData();
  }

  render() {
    const dataExists = this.state.data !== null && this.state.data.statuses[0];

    return (
      <>
        <div>
          {dataExists ? (
            <InfoBox
              found_on={this.state.data.statuses[0]["created_at"]}
              author={this.state.data.statuses[0].user.screen_name}
              id={this.state.data.statuses[0].id_str}
              media={this.state.data.statuses[0]["extended_entities"].media}
              author_avatar={this.state.data.statuses[0].user.profile_image_url}
              text={this.state.data.statuses[0].full_text}
              link={`https://${
                this.state.data.statuses[0].full_text.split("https://")[1]
              }`}
              hashtags={this.state.data.statuses[0].entities.hashtags}
              parent={this}
            />
          ) : (
            <figure
              css={css`
                text-align: center;
              `}
            >
              <figcaption
                css={css`
                  margin-top: 3em;
                `}
              >
                Loading... Fetching some data
              </figcaption>
              <span css={styles.badge}>
                <img src={require("./images/hat.png")} alt="loading" />
              </span>
            </figure>
          )}
          {this.state.fail === true && (
            <div
              css={css`
                background: rgba(255, 0, 0, 0.1);
                color: red;
                padding: 16px;
                border-radius: 8px;
                border: 1px solid red;
                margin: 100px auto;
                max-width: 600px;
                line-height: 2;
              `}
            >
              <p>
                An error occured or there is no data to display. <br />
                Please refresh the page, or send us a tweet at @LukyVj
              </p>
            </div>
          )}
        </div>
      </>
    );
  }
}
export default Finder;
