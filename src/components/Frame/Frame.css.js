import { css } from "@emotion/core";
import frame from "../../images/frame.png";
import blueBg from "../../images/bgOnline.png";

export default {
  root: css`
    border-color: #2e2e2e;
    border-image-repeat: all;
    border-image-slice: 14;
    border-image-outset: 3px;
    border-image-source: url(${frame});
    border-style: solid;
    border-width: 6px 0;
    padding: 16px;
    text-align: center;
    width: calc(100% - 16px * 2);
    font-family: "RDRrocks-sg";
    letter-spacing: 2px;
    color: white;
    -webkit-font-smoothing: antialiased;
    background: url(${blueBg});
    position: relative;
    left: 0;
    z-index: 10;

    h1,
    h4 {
      font-size: 2em;
    }

    p {
      font-family: "RDRHapna-Regular";
    }

    h1 {
      text-shadow: 2px 2px 1px rgba(0, 0, 0, 0.6);
      &::before,
      &::after {
        content: "";
        display: block;
        position: absolute;
        top: 0;
        bottom: 0;
        width: 40px;
        left: -40px;
        background: url(${require("../../images/header-left.png")}) no-repeat
          center center / contain;
        z-index: 999999;
      }

      &::after {
        left: inherit;
        right: -40px;
        background: url(${require("../../images/header-right.png")}) no-repeat
          center center / contain;
      }
    }

    @media (max-width: 960px) {
      position: fixed;
      h4 {
        font-size: 1.05em;
      }
      h1 {
        font-size: 1.45em;
      }
    }
  `,
  cyclesPopup: css`
    position: absolute;
    width: 280px;
    padding: 0.5em;
    left: 0;
    top: 46px;
    font-family: Arial;
    font-size: 16px;
    background-color: #c79f6f;
    box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.02),
      0 6.7px 5.3px rgba(0, 0, 0, 0.028), 0 12.5px 10px rgba(0, 0, 0, 0.035),
      0 22.3px 17.9px rgba(0, 0, 0, 0.042), 0 41.8px 33.4px rgba(0, 0, 0, 0.05),
      0 100px 80px rgba(0, 0, 0, 0.07);
    border-radius: 4px;
    z-index: 10000000000;
    border-color: #2e2e2e;
    border-image-repeat: all;
    border-image-slice: 14;
    border-image-outset: 1px;
    border-image-source: url(${frame});
    border-style: solid;

    .cycle-item {
      background: url(${blueBg});
    }

    img {
      background-color: #c79f6f;
      padding: 4px;
      border-radius: 100px;
    }
  `
};
