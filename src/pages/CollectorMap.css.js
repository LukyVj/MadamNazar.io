import { css } from "@emotion/core";
import frame from "../images/frame.png";

export default {
  iframe: css`
    border: 4px solid var(--Armadillo);
    border-image-repeat: all;
    border-image-slice: 10;
    border-image-source: url(${frame});
    border-style: solid;
    border-width: 6px;
    background: var(--EcruWhite);
    background: #d2b790;
  `
};
