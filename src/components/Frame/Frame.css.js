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
    position: fixed;
    left: 0;
    font-size: 2em;
    z-index: 10;

    @media (max-width: 960px) {
      font-size: 1.45em;
    }
  `
};
