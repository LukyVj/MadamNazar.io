import React, { Component } from "react";
import ReactGA from "react-ga";

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div className="pv-32">
        <h2>Disclaimer:</h2>
        <b>
          <i>This project is not affiliated to RockStar in any way</i>
        </b>
        <h2>Information:</h2>
        <p>
          Hello and thank you for visiting this website, I've put a lot of love
          and passion in it, and the fact that a few people uses it makes me
          happy.
        </p>

        <p>
          However, you have to understand that this whole project takes time to
          work on. I work on it on my spare time, and I don't plan to invest
          more than what I already invest at the moment.
        </p>

        <p>
          The API runs on a simple heroku instance, and is maintained manually,
          which can explain some delay sometimes between Madam Nazar location
          and what the API return.
        </p>

        <p>
          If you notice some issues regarding the location provided by the
          website, please contact me using the button on the navigation
        </p>

        <h2>Credits:</h2>
        <p>
          Made by 
          <a
            href="https://twitter.com/lukyvj"
            target="_blank"
            rel="noreferrer noopener"
            onClick={() => {
              ReactGA.event({
                category: "click.link",
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
                category: "click.link",
                action: "Click on API link"
              });
            }}
          >
            Madam Nazar Location Api
          </a>{" "}
          - Follow{" "}
          <a
            href="https://twitter.com/FinderNazar"
            target="_blank"
            rel="noreferrer noopener"
            onClick={() => {
              ReactGA.event({
                category: "click.link",
                action: "Click on FinderNazar Twitter profile"
              });
            }}
          >
            @FinderNazar
          </a>{" "}
          for regular updates about this project. <br />
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
                category: "click.link",
                action: "Click on LukyVj Twitch profile"
              });
            }}
          >
            myself
          </a>{" "}
          on Twitch
        </p>

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
                category: "click.link",
                action: "Click on Jean Ropke Github profile"
              });
            }}
          >
            @JeanRopke
          </a>{" "}
          for his amazing work on the collector's map &amp; for allowing us to
          use it on madamnazar.io
        </p>
        <p>
          Also, thanks to{" "}
          <a
            href="https://levelup.gitconnected.com/recreating-the-red-dead-redemption-2-tintype-loading-screen-effect-in-css-10ca87d5b9de"
            onClick={() => {
              ReactGA.event({
                category: "click.link",
                action: "Click on Lee Martin's article link"
              });
            }}
          >
            Lee Martin
          </a>{" "}
          for his top notch work on the css effect to "Recreate the Red Dead
          Redemption 2 Tintype Loading Screen Effect in CSS"
        </p>

        <h2>Show some support</h2>
        <p>
          You can support my work on{" "}
          <a href="https://patreon.com/lukyvj">Patreon</a>
        </p>
      </div>
    );
  }
}
export default About;
