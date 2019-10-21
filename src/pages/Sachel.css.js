import { css } from "emotion";
import frame from "../images/frame.png";
import bgMainSml from "../images/bgMainSml.jpg";
import blueBg from "../images/bgOnline.png";
import doubleBorder from "../images/double_5.png";

export default {
  boxBorders: css`
    border-color: #2e2e2e;
    border-image-repeat: all;
    border-image-slice: 14;
    border-image-outset: 3px;
    border-image-source: url(${frame});
    border-style: solid;
    border-width: 6px;
  `,
  boxBordersSmall: css`
    border-color: #2e2e2e;
    border-image-repeat: all;

    border-image-source: url(${frame});
    border-style: solid;

    border-image-slice: 30;
    border-image-outset: 3px;
    letter-spacing: 0.15em;
  `,
  activeButton: css`
    background: url(${blueBg});
    color: white;
  `,
  itemBox: css`
    border-image-repeat: repeat;
    border-image-slice: 24;
    border-image-outset: 3px;
    border-image-source: url(${doubleBorder});
    border-style: solid;
    border-width: 17px;
  `,
  title: css`
    background: var(--Armadillo);
    color: var(--EcruWhite);
    font-size: 18px;
  `,
  collected: css`
    background: red;
  `,
  button: css`
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    padding: 8px;
    display: inline-block;
    border-radius: 100px;
  `,
  buttonLeft: css`
    border-top-right-radius: 0;
    border-bottom-right-radius: 0%;
  `,
  buttonRight: css`
    border-top-left-radius: 0;
    border-bottom-left-radius: 0%;
  `
};
