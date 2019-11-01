/** @jsx jsx */
import React from "react";
import { css, jsx } from "@emotion/core";
import { navigation } from "../../data/navigation";
import styles from "../../styles/globalStyles.css";
import { NavLink } from "react-router-dom";
const Navigation = props => {
  const { parent, navOpen } = props;

  return (
    <header
      className="App-header"
      css={css`
        height: auto;
        padding-bottom: 2em;

        text-align: center;
        position: relative;
        &:after {
          position: absolute;
          width: 100%;
          height: 100%;
          content: "";
          display: block;
          background: url(${require("../../images/bgRip.png")}) repeat-x bottom
            10px center;
        }
      `}
    >
      <div
        className="d-flex ai-center jc-center md:d-none pos-fixed top-48 right-0 m-16 p-8 cu-pointer bdr-4"
        css={css`
          background: url(${require("../../images/bgMainSml.jpg")});
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
          z-index: 100;
          left: 0;
          right: 0;
          max-width: 130px;
          margin: auto;
          top: 58px;
          font-weight: bold;

          button {
            font-weight: bold;
          }
        `}
      >
        <button
          className="m-0 va-middle tt-upper bgc-transparent bdw-0 bdc-transparent app-none d-flex"
          onClick={() => {
            parent.setState({ navOpen: !navOpen });
          }}
        >
          <span role="img" aria-label="hamburger icon" className="mr-8 fx-8">
            ☰
          </span>{" "}
          <span className=" fx-8">Menu</span>
        </button>
      </div>
      <div>
        <ul
          className={`md:d-block md:pos-relative pos-fixed w-90p md:w-100p ${
            navOpen ? "d-flex fxd-column jc-center" : "d-none"
          }`}
          css={styles.modal}
        >
          {navigation.map((item, index) => (
            <li
              key={item.link}
              className="pv-8 md:pv-0 md:pl-8 md:pr-8 md:mr-24 pos-relative md:d-flex ai-center jc-center md:w-auto"
              css={[
                index !== navigation.length - 1 &&
                  css`
                    &:after {
                      content: "";
                      display: block;
                      position: absolute;
                      background: url(${require("../../images/bullet.png")})
                        no-repeat center center / contain;
                      width: 16px;
                      height: 16px;
                      top: 50%;
                      right: -16px;
                      transform: translateY(-50%);

                      @media (max-width: 960px) {
                        display: none;
                      }
                    }
                  `,
                window.location.pathname === item.url &&
                  css`
                    color: red;
                  `,
                css`
                  @media (max-width: 960px) {
                    font-size: 32px;
                  }
                `
              ]}
            >
              {item.appLink === true ? (
                <NavLink
                  to={item.url}
                  onClick={() => {
                    parent.setState({ navOpen: false });
                    item.onclick();
                  }}
                  activeStyle={{ color: "var(--Tabasco)" }}
                  exact
                >
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={`${item.image}`}
                      width={18}
                      className="va-middle mr-8"
                    />
                  ) : item.emoji ? (
                    <span role="img" arial-label="emoji" className="mr-8">
                      {item.emoji}
                    </span>
                  ) : null}
                  {item.title}
                </NavLink>
              ) : (
                <a
                  href={item.url}
                  onClick={() => {
                    parent.setState({ navOpen: false });
                    item.onclick();
                  }}
                  title={item.title}
                  rel={item.rel}
                  target={item.target}
                >
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={`${item.image}`}
                      width={18}
                      className="va-middle mr-8"
                    />
                  ) : item.emoji ? (
                    <span role="img" arial-label="emoji" className="mr-8">
                      {item.emoji}
                    </span>
                  ) : null}
                  {item.title}
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Navigation;
