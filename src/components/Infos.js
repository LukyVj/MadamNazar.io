/** @jsx jsx */
import React from "react";
import ReactGA from "react-ga";
import { jsx, css } from "@emotion/core";

const Infos = ({ children, styles, className, extraPadding }) => (
  <span
    className={`mb-16 ${
      extraPadding ? "p-32 pr-48" : "p-24 pr-32"
    } d-inline-block ${className}`}
    css={[
      css`
        background: url(${require("../images/announcement_background.png")})
          no-repeat center center / 100% 100%;

        color: white;
      `,
      styles
    ]}
  >
    {children}
  </span>
);

export default Infos;
