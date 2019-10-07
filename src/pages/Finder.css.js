import { css } from "@emotion/core";
import sheet from "../images/sheet.png";
export default {
  posterGrid: css``,
  posterWrapper: css`
    filter: drop-shadow(0 5px 5px rgba(0, 0, 0, 0.4));
  `,
  posterLayout: css`
    position: relative;

    margin: auto;
    border-radius: 138px;
    z-index: 2;

    .header {
      text-align: center;
    }

    @media (min-width: 960px) {
      padding: 0 2em;
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
  avatar: css`
    animation: blur 5s forwards;
    height: 100px;
    max-height: 640px;
    max-width: 640px;
    position: relative;
    width: 100px;
    overflow: hidden;

    div {
      height: 100%;
      position: absolute;
      width: 100%;
    }

    .normal {
      background-size: cover;
    }

    .invert {
      animation: mask 5s steps(69) forwards;
      background-size: cover;
      filter: invert(1) grayscale(1);
      -webkit-mask: url(${sheet});
      -webkit-mask-size: 7000% 100%;
      mask: url(${sheet});
      mask-size: 7000% 100%;
    }

    @keyframes blur {
      from {
        filter: blur(3px);
        opacity: 0;
      }
      to {
        filter: blur(0px);
        opacity: 1;
      }
    }

    @keyframes mask {
      from {
        -webkit-mask-position: 0% 0;
        mask-position: 0% 0;
      }
      to {
        -webkit-mask-position: 100% 0;
        mask-position: 100% 0;
      }
    }
  `
};
