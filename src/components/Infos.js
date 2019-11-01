/** @jsx jsx */
import React from "react";
import ReactGA from "react-ga";
import { jsx, css } from "@emotion/core";

const Infos = ({ children, styles, className }) => (
  <span
    className={`mb-16 ph-16 d-inline-block ${className}`}
    css={[
      css`
        border-image-slice: 10;
        border-image-outset: 3px;
        border-image-source: url(${require("../images/frame.png")});
        border-style: solid;
        border-width: 4px;
        background: rgba(255, 255, 255, 0.3);
        color: var(--Armadillo);
      `,
      styles
    ]}
  >
    {children}
  </span>
);

export default Infos;
