/** @jsx jsx */
import React, { Component } from "react";
import ReactGA from "react-ga";
import { css, jsx } from "@emotion/core";
import { resources } from "../data/resources";
import Infos from "../components/Infos";

class Ecosystem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    ReactGA.pageview("/resources");
  }

  render() {
    return (
      <>
        <Infos>
          <h2>Find resources for Red dead redemption 2</h2>
          <h3>
            Plenty of talented people are creating content, websites, trackers,
            to help you understand and get the maximum out of the game
          </h3>
        </Infos>
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
