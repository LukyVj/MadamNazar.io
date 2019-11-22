import { css } from "@emotion/core";
import frame from "../images/frame.png";
import blueBg from "../images/bgOnline.png";

export default {
  textarea: css`
    border-image-repeat: all;
    border-image-slice: 14;
    border-image-outset: 3px;
    border-image-source: url(${frame});
    border-style: solid;
    border-width: 6px;
    background: url(${blueBg});
    color: white;
    max-width: calc(100% - 32px);
  `,
  mapBox: css`
    &:hover {
      border-image-repeat: all;
      border-image-slice: 14;
      border-image-outset: 3px;
      border-image-source: url(${frame});
      border-style: solid;
      border-width: 6px;
    }
  `,
  button: css`
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
      color:white;
    }
  `,
  tweet: css`
    border-image-repeat: all;
    border-image-slice: 10;
    border-image-outset: 3px;
    border-image-source: url(${frame});
    border-style: solid;
    border-width: 6px;
    background: url(${blueBg});
    background: var(--EcruWhite);
    color: black;
    word-break: break-all;
  `
};
