import { css } from "@emotion/core";
import frame from "../images/frame.png";

export default {
  iframe: css`
    border: 4px solid var(--Armadillo);
    border-image-repeat: all;
    border-image-slice: 10;
    border-image-outset: 3px;
    border-image-source: url(${frame});
    border-style: solid;
    border-width: 6px;
    background: var(--EcruWhite);
    background: #d2b790;
    width: calc(100% - 14px);

    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.3),
      0 4px 8px rgba(0, 0, 0, 0.3), 0 8px 16px rgba(0, 0, 0, 0.3);
    z-index: 5;
  `
};
