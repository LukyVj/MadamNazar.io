import ReactGA from "react-ga";
import { TWITTER_URL, DISCORD_URL } from "../scripts/constants";

export const navigation = [
  {
    title: "Finder",
    url: "/",
    appLink: true,
    onclick: () => {
      ReactGA.event({
        category: "click.nav.link",
        action: "Click Finder link"
      });
    }
  },
  {
    title: "Maps",
    appLink: true,
    url: "/maps",
    onclick: () => {
      ReactGA.event({
        category: "click.nav.link",
        action: "Go to maps"
      });
    }
  },
  {
    title: "Deck",
    appLink: true,
    url: "/deck",
    onclick: () => {
      ReactGA.event({
        category: "click.nav.link",
        action: "Go to deck"
      });
    }
  },
  {
    title: "Resources",
    appLink: true,
    url: "/resources",
    onclick: () => {
      ReactGA.event({
        category: "click.nav.link",
        action: "Go to Resources"
      });
    }
  },
  {
    title: "About",
    url: "/about",
    appLink: true,
    onclick: () => {
      ReactGA.event({
        category: "click.nav.link",
        action: "Click About link"
      });
    }
  },
  {
    title: "Tweet",
    url: "/tweet",
    appLink: true,
    onclick: () => {
      ReactGA.event({
        category: "click.nav.link",
        action: "Click Tweet page link"
      });
    }
  },
  {
    title: "Discord",
    target: "_blank",
    rel: "noreferrer noopener",
    url: DISCORD_URL,
    onclick: () => {
      ReactGA.event({
        category: "click.nav.link",
        action: "Click Discord link"
      });
    }
  }
];

/**
 * {
    title: "add to favorite",
    url: "#",
    onclick: e => {
      rudr_favorite(e, this);
      ReactGA.event({
        category: "click.nav.link",
        action: "Add to Favorite"
      });
    }
  },
  {
    title: "Share it",
    target: "_blank",
    rel: "noreferrer noopener",
    url:
      "https://twitter.com/intent/tweet?text=%F0%9F%A7%BF%20NazarFinder%20-%20Get%20the%20updated%20location%20of%20Madam%20Nazar%20in%20Red%20Dead%20Redemption%202%20Online%20https%3A%2F%2Fmadamnazar.io%20from%20%40lukyvj",
    onclick: () => {
      ReactGA.event({
        category: "click.nav.link",
        action: "Click Share link"
      });
    }
  }
 */
