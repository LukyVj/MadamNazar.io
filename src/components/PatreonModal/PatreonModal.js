/** @jsx jsx */
import React, { Component } from "react";
import ReactGA from "react-ga";
import { css, jsx } from "@emotion/core";
import {
  WEBSITE_NAME,
  PATREON_URL,
  TWITTER_URL,
  TWITTER_NAME
} from "../../scripts/constants";
import frame from "../../images/frame.png";

const styles = {
  root: css`
    background: white;
    z-index: 99999;
    border-image-repeat: all;
    border-image-slice: 14;
    border-image-outset: 3px;
    border-image-source: url(${frame});
    border-style: solid;
    border-width: 6px;
    box-shadow: 0 2px 1px rgba(0, 0, 0, 0.09), 0 4px 2px rgba(0, 0, 0, 0.09),
      0 8px 4px rgba(0, 0, 0, 0.09), 0 16px 8px rgba(0, 0, 0, 0.09),
      0 32px 16px rgba(0, 0, 0, 0.09), 0 0 500px rgba(0, 0, 0, 0.3);
    outline: 100vw solid rgba(0, 0, 0, 0.5);

    @media (max-width: 960px) {
      width: calc(100vw - 64px);
      height: calc(90vh - 64px);
      top: 0;
      left: 0;
      overflow: scroll;
    }
  `,
  button: css`
    background: rgba(0, 0, 0, 0.78);
    color: var(--EcruWhite);
    font-size: 18px;
    padding: 10px 20px;
    border-radius: 100px;
    text-decoration: none;
    margin-right: 16px;
    cursor: pointer;
    display: block;
    margin: auto;
    text-align: center;

    &:hover {
      background: var(--Tabasco);
    }
  `
};

const PatreonModal = parent => (
  <div
    className="pos-fixed top-120 left-0 right-0 m-auto maw-600 p-24 bxs-default bdr-6"
    css={[styles.root, styles.border]}
  >
    <div
      className="w-100p"
      css={css`
        height: 200px;
      `}
    >
      <img
        src="https://res.cloudinary.com/hckp6e9ap/image/upload/e_grayscale/v1571648033/website/EHKUGFMXUAALGE3_jbmxwo.jpg"
        css={css`
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
        `}
        alt="Madam Nazar Old Fashion"
      />
    </div>
    <p>
      Dear collectors, just a quick message you'll see only once{" "}
      <span role="img" aria-label="emoji scroll">
        📜
      </span>
    </p>
    <p>
      This website is maintained by{" "}
      <a
        href="https://twitter.com/lukyvj"
        onClick={() => {
          ReactGA.event({
            category: "click.patreon.modal.link",
            action: "Click on LukyVj Twitter profile"
          });
        }}
      >
        myself
      </a>{" "}
      on my free time, I do it because I love Red Dead Redemption 2, and I love
      to help communities.
    </p>
    <p>
      If you love {WEBSITE_NAME} and want to support us, you can make a donation
      on{" "}
      <a
        href={PATREON_URL}
        onClick={() => {
          ReactGA.event({
            category: "click.patreon.modal.link",
            action: "Click on Patreon URL"
          });
        }}
      >
        Patreon
      </a>
      . It will help us to maintain the webite (domain and such) and to keep the
      API up and running. If you feel like it, consider making a donation, even
      small ones can help a lot!
    </p>

    <p>
      Also, following our{" "}
      <a
        href={TWITTER_URL}
        onClick={() => {
          ReactGA.event({
            category: "click.patreon.modal.link",
            action: `Click on ${TWITTER_NAME} Twitter profile`
          });
        }}
      >
        Twitter account
      </a>{" "}
      would be helpful 💕
    </p>

    <p>
      Thank you,
      <br />
      LukyVj 🤠👨‍💻
    </p>

    <button
      css={styles.button}
      onClick={() => {
        parent.parent.setState({ showPatreonAbout: false });

        ReactGA.event({
          category: "click.patreon.modal.button",
          action: `Click on close`
        });
      }}
    >
      Close
      <img
        src={require("../../images/cancel-icon.svg")}
        css={css`
          width: 18px;
        `}
        className="va-middle ml-8"
        alt="close icon"
      />
    </button>
  </div>
);

export default PatreonModal;
