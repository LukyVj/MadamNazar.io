/** @jsx jsx */
import React from "react";
import ReactGA from "react-ga";
import { jsx, css } from "@emotion/core";

const Infos = ({ children, styles }) => (
  <span
    className="mb-16 p-8 d-inline-block"
    css={[
      css`
        border-image-slice: 10;
        border-image-outset: 3px;
        border-image-source: url(${require("../images/frame.png")});
        border-style: solid;
        border-width: 6px;
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
