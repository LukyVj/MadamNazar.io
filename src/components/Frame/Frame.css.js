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
  `
};
