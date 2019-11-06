/** @jsx jsx */
import React from "react";
import { css, jsx } from "@emotion/core";

import { footer } from "../../data/footer";

const Footer = props => {
  return (
    <footer
      css={css`
        margin: 16px auto 0;
        text-align: center;
        background: url(${require("../../images/bgOnline.png")}) repeat;
        position: relative;
        color: white;
        border-image-repeat: all;
        border-image-slice: 14;
        border-image-outset: 3px;
        border-image-source: url(${require("../../images/frame.png")});
        border-style: solid;
        border-width: 6px 0 0 0;
      `}
    >
      <div>
        <ul className="lis-none p-0 m-0">
          {footer.map(footer_link => (
            <li key={footer_link.title} className="d-inline-block ph-8">
              <a
                href={footer_link.url}
                onClick={footer_link.onClick}
                className="color-current td-none fsz-14"
              >
                {footer_link.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="ta-center pos-relative">
        <small
          css={css`
            letter-spacing: 2px;
            font-size: 16px;
            font-family: "RDRrocks-sg";
            line-height: 3;
          `}
        >
          For the{" "}
          <span role="img" aria-label="heart">
            ❤️
          </span>{" "}
          of the RDO community
          <br />
          V1.5
        </small>
      </div>
    </footer>
  );
};

export default Footer;
