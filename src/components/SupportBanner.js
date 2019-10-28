/** @jsx jsx */
import React, { Component } from "react";
import ReactGA from "react-ga";
import { css, jsx } from "@emotion/core";

import { docCookies } from "../scripts/cookies";
import { WEBSITE_NAME } from "../scripts/constants";
import frame from "../images/frame.png";

export const SupportBanner = parent => (
  <div
    className=" pv-8 ta-center d-flex ai-cente jc-center fsz-12 md:fsz-16"
    css={css`
      background: url("${require("../images/rockstar-rdr2-banner.png")}") repeat center center /
        800px;
      width: 100%;
      left: 0;
      color: white;
      z-index: 999;
      top: 0;
      
    border-color: #2e2e2e;
    border-image-repeat: all;
    border-image-slice: 14;
    border-image-outset: 3px;
    border-image-source: url(${frame});
    border-style: solid;
    border-width: 6px 0;
    position:absolute;

    @media (max-width: 960px) {
        position: fixed;
        
    }
  
    `}
  >
    <div className="maw-600 pos-relative m-auto">
      {" "}
      <span
        className="cursor-pointer"
        css={css`
          color: white;
          text-decoration: none;
        `}
        onClick={() => {
          parent.parent.setState({ showPatreonAbout: true, patreonAd: false });
        }}
      >
        <span role="img" aria-label="emoji pink double hearts">
          💕
        </span>{" "}
        <b>Support {WEBSITE_NAME}! Click to learn more</b> 
        <span role="img" aria-label="emoji pink double hearts">
          💕
        </span>{" "}
      </span>
      <span>
        <button
          className="app-none bdw-0 bgc-transparent p-0 m-0 va-middle cursor-pointer"
          onClick={() => {
            docCookies.setItem("patreon-ad", false, 999);
            parent.parent.setState({ updated: true, patreonAd: false });
          }}
        >
          <img
            src={require("../images/cancel-icon.svg")}
            className="va-middle"
            alt="close icon"
          />
        </button>
      </span>
    </div>
  </div>
);
