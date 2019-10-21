import { css } from "@emotion/core";
import frame from "../images/frame.png";
import bgMainSml from "../images/bgMainSml.jpg";

export default {
  modal: css`
    padding: 0;
    margin: 0;
    text-transform: uppercase;
    text-decoration: none;
    font-size: 1em;
    letter-spacing: 0.045em;
    list-style: none;
    line-height: 1.5em;
    height: 1.5em;
    font-family: RDRrocks-sg;

    border-color: #2e2e2e;
    border-image-repeat: all;
    border-image-slice: 14;
    border-image-outset: 3px;
    border-image-source: url(${frame});
    border-style: solid;
    border-width: 6px 0;

    @media (max-width: 960px) {
      height: 50vh;
      background: var(--EcruWhite);
      background: url(${bgMainSml});
      border-width: 6px;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      margin: auto;
      z-index: 100;
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2), 0 6px 22px rgba(0, 0, 0, 0.5),
        0 0 45px rgba(0, 0, 0, 0.25);
    }

    li {
      display: inline-block;
    }
    a {
      text-decoration: none;
      color: var(--Armadillo);
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
  boxBorders: css`
    border-color: #2e2e2e;
    border-image-repeat: all;
    border-image-slice: 14;
    border-image-outset: 3px;
    border-image-source: url(${frame});
    border-style: solid;
    border-width: 6px;
  `
};
