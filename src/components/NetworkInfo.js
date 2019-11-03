/** @jsx jsx */
import React from "react";
import { css, jsx } from "@emotion/core";
import { isOnline } from "../scripts/helpers";
import { DEV_API, PROD_API, MOCK_API } from "../scripts/constants";

const apiDefined = isOnline === true ? DEV_API : MOCK_API;

const NetworkInfo = () => (
  <>
    <div
      className="p-8 ta-center bxs-default"
      css={css`
        background: ${isOnline ? "rgba(120, 200, 120)" : "rgba(255, 100, 100)"};
        color: white;
        position: fixed;
        z-index: 999999999;
        bottom: 0;
        width: 300px;
        right: 0;
        bottom: 0;
        color: white;
        z-index: 999999999999999999999999;
        border-radius: 14px;
        margin: 16px;
        font-size: 14px;
        text-shadow: 1px 1px 10px rgba(0, 0, 0, 0.8);
      `}
    >
      <p className="p-0 mv-8">
        Running locally, {isOnline === true ? "with" : "without"} an internet
        access{" "}
      </p>
      <p className="p-0 mv-8">
        Data fecthed from <a href={apiDefined}>{apiDefined}</a>
      </p>
    </div>
  </>
);

export default NetworkInfo;
