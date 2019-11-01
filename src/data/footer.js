import ReactGA from "react-ga";
import { TWITTER_URL } from "../scripts/constants";

export const footer = [
  {
    title: "API",
    url: "https://documenter.getpostman.com/view/6602370/SVtN3rnY",
    target: "_blank",
    rel: "noreferrer noopener",
    onclick: () => {
      ReactGA.event({
        category: "click.nav.link",
        action: "Click API link"
      });
    }
  },
  {
    title: "Contact",
    target: "_blank",
    rel: "noreferrer noopener",
    url: TWITTER_URL,
    onclick: () => {
      ReactGA.event({
        category: "click.nav.link",
        action: "Click Contact link (twitter)"
      });
    }
  }
];
