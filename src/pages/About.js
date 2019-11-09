import React, { Component } from "react";
import ReactGA from "react-ga";
import { css, jsx } from "@emotion/core";
import {
  WEBSITE_NAME,
  PATREON_URL,
  TWITTER_URL,
  TWITTER_NAME
} from "../scripts/constants";

import Infos from "../components/Infos";

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    ReactGA.pageview("/about");
  }

  render() {
    return (
      <>
        <Infos>
          <h2>Disclaimer:</h2>
          <b
            css={css`
              background: rgba(255, 255, 255, 0.15);
            `}
          >
            <i>This project is not affiliated to RockStar in any way</i>
          </b>
          <h2>Information:</h2>
          <p>
            Hello and thank you for visiting this website, I've put a lot of
            love and passion in it, and the fact that a few people uses it makes
            me happy.
          </p>

          <p>
            However, you have to understand that this whole project takes time
            to work on. I work on it on my spare time, and I don't plan to
            invest more than what I already invest at the moment.
          </p>

          <p>
            The API runs on a simple heroku instance, and is maintained
            manually, which can explain some delay sometimes between Madam Nazar
            location and what the API returns.
          </p>

          <p>
            If you notice some issues regarding the location provided by the
            website, please contact me using the button on the navigation
          </p>
        </Infos>

        <Infos>
          <h2>Credits:</h2>
          <p>
            Made by 
            <a
              href="https://twitter.com/lukyvj"
              target="_blank"
              rel="noreferrer noopener"
              onClick={() => {
                ReactGA.event({
                  category: "click.about.link",
                  action: "Click on LukyVj Twitter profile"
                });
              }}
            >
              @LukyVj
            </a>{" "}
            using the unofficial{" "}
            <a
              href="https://documenter.getpostman.com/view/6602370/SVtN3rnY"
              target="_blank"
              rel="noreferrer noopener"
              onClick={() => {
                ReactGA.event({
                  category: "click.about.link",
                  action: "Click on API link"
                });
              }}
            >
              Madam Nazar Location Api
            </a>{" "}
            - Follow{" "}
            <a
              href={TWITTER_URL}
              target="_blank"
              rel="noreferrer noopener"
              onClick={() => {
                ReactGA.event({
                  category: "click.about.link",
                  action: `Click on ${TWITTER_NAME} Twitter profile`
                });
              }}
            >
              {TWITTER_NAME}
            </a>{" "}
            for regular updates about this project.{" "}
          </p>
          <p>
            You can also find{" "}
            <a
              href="https://www.twitch.tv/iamfabriceg"
              target="_blank"
              rel="noreferrer noopener"
              onClick={() => {
                ReactGA.event({
                  category: "click.link",
                  action: "Click on Fabrice Twitch profile"
                });
              }}
            >
              My friends
            </a>{" "}
            &amp; 
            <a
              href="https://www.twitch.tv/lukyvj"
              target="_blank"
              rel="noreferrer noopener"
              onClick={() => {
                ReactGA.event({
                  category: "click.about.link",
                  action: "Click on LukyVj Twitch profile"
                });
              }}
            >
              myself
            </a>{" "}
            on Twitch.
          </p>
          
          <h3>Going further</h3>
          <p>You can use my Epic Games creator code: <b>LUKYVJ</b></p>
        </Infos>
        <Infos>
          <h2>Thanks:</h2>
          <p>
            To{" "}
            <a
              href="https://github.com/jeanropke"
              title="Jean ropke github"
              target="_blank"
              rel="noreferrer noopener"
              onClick={() => {
                ReactGA.event({
                  category: "click.about.link",
                  action: "Click on Jean Ropke Github profile"
                });
              }}
            >
              @JeanRopke
            </a>{" "}
            for his amazing work on the collector's map &amp; for allowing us to
            use it on {WEBSITE_NAME}
          </p>
          <p>
            Also, thanks to{" "}
            <a
              href="https://levelup.gitconnected.com/recreating-the-red-dead-redemption-2-tintype-loading-screen-effect-in-css-10ca87d5b9de"
              onClick={() => {
                ReactGA.event({
                  category: "click.about.link",
                  action: "Click on Lee Martin's article link"
                });
              }}
            >
              Lee Martin
            </a>{" "}
            for his top notch work on the css effect to: "Recreate the Red Dead
            Redemption 2 Tintype Loading Screen Effect in CSS".
          </p>

          <h2>Contributors:</h2>
          <p>Special thanks to all these amazing contributors</p>
          <ul>
            {["@Noha69980668", "SethStar16T"].map(contributor => (
              <li key={contributor}>
                <a
                  href={`https://twitter.com/${contributor}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {contributor}
                </a>
              </li>
            ))}
          </ul>

          <h2>Donations are welcome!</h2>
          <p>
            You can support us on{" "}
            <a
              href={PATREON_URL}
              onClick={() => {
                ReactGA.event({
                  category: "click.about.link",
                  action: "Click on Patreon link"
                });
              }}
            >
              Patreon
            </a>
          </p>
        </Infos>
        <Infos
          className="maw-100p"
          styles={css`
            display: block;
          `}
        >
          <h2>They talk about us</h2>
          <div className="md:d-grid g-4 w-100p">
            <a href="https://www.gtabase.com/news/red-dead-redemption-2/red-dead-online-how-to-easily-reach-rank-20-in-each-role-thanks-to-the-community">
              <img
                src={require("../images/gtabase_com_logo_red.png")}
                alt="GTABase logo"
                className="w-100"
              />
            </a>
          </div>
        </Infos>
      </>
    );
  }
}
export default About;
