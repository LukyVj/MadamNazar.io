/** @jsx jsx */
import React, { Component } from "react";
import ReactGA from "react-ga";
import { css, jsx } from "@emotion/core";
import { resources, showcase } from "../data/resources";
import Infos from "../components/Infos";
import styles from "../styles/globalStyles.css";

class Ecosystem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    ReactGA.pageview("/resources");
  }

  render() {
    console.log(showcase[0]);
    return (
      <>
        <Infos>
          <h2>Find resources for Red dead redemption 2</h2>
          <h3>
            Plenty of talented people are creating content, websites, trackers,
            to help you understand and get the maximum out of the game
          </h3>
        </Infos>
        {showcase.length && (
          <section className="pv-24">
            <h2>Latest addition</h2>
            <div
              className="p-24 color-white bdr-6 d-flex bxs-2 ta-center md:ta-left"
              css={css`
                background: linear-gradient(
                  to top left,
                  ${showcase[0].bakground[0]},
                  ${showcase[0].bakground[1]}
                );

                h3 {
                  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.7);
                  letter-spacing: 0.15em;
                }
              `}
            >
              <div className="ph-16 ai-center jc-center pos-relative fx-3 d-none md:d-flex">
                <img
                  src={require("../images/gtabase_com_logo_red.png")}
                  alt="GTABase logo"
                  className="w-100p va-middle p-8"
                />
              </div>
              <div className="ph-16 d-flex fxd-column md:d-block">
                {" "}
                <h3 className="p-0 m-0 label lsp-big">{showcase[0].title}</h3>
                <p>{showcase[0].description}</p>
                <a
                  href={showcase[0].url}
                  css={[
                    styles.button,
                    css`
                      font-size: 16px;
                    `
                  ]}
                  className="color-white pr-0 tt-upper fl-right"
                >
                  Visit the website
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    className="va-middle mh-8 pv-0 m-0 pos-relative"
                    css={css`
                      top: -2px;
                    `}
                    width={22}
                  >
                    <path d="M5 12h14m-7-7l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </div>
          </section>
        )}
        <div
          css={css`
            position: sticky;
            top: 80px;
          `}
        >
          <section className="md:d-grid g-2">
            {resources.map(resource => (
              <div>
                <div className="p-8 fx-12">
                  <div>
                    <h3
                      className="p-0 m-0 mb-32 label pv-8 ta-center"
                      css={css`
                        background: url(${require("../images/button-bg.png")})
                          no-repeat center left / 100%;
                        color: var(--EcruWhite);
                        letter-spacing: 0.1em;
                      `}
                    >
                      {resource.type}
                    </h3>
                  </div>
                  <div className="md:d-grid g-2 ggap-8">
                    {resource.content.map(item => (
                      <div
                        key={item.title}
                        className="p-16 mb-8 bxs-default bdr-6"
                        css={css`
                          background: white;
                        `}
                      >
                        <div>
                          <a
                            href={item.url}
                            onClick={item.onclick}
                            css={css`
                              color: var(--Armadilo);
                              text-decoration-color: var(--Twine);
                            `}
                          >
                            {item.title}
                          </a>
                        </div>
                        <p>{item.description}</p>
                        <small>
                          By <a href={item.author.url}>{item.author.name}</a>
                        </small>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </section>
        </div>
      </>
    );
  }
}
export default Ecosystem;
