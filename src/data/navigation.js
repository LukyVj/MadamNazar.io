import ReactGA from "react-ga";
import { rudr_favorite } from "../scripts/helpers";

export const navigation = [
  {
    title: "Home",
    url: "/",
    appLink: true,
    onclick: e => {
      ReactGA.event({
        category: "click.link",
        action: "Click Home link"
      });
    },
    image: require("../images/star.svg")
  },
  {
    title: "Collectors Map",
    target: "_blank",
    appLink: true,
    url: "/map",
    onclick: () => {
      ReactGA.event({
        category: "click.link",
        action: "Go to map"
      });
    },
    emoji: "🗺"
  },
  {
    title: "add to favorite",
    url: "#",
    onclick: e => {
      rudr_favorite(e, this);
      ReactGA.event({
        category: "click.link",
        action: "Add to Favorite"
      });
    },
    image: require("../images/star.svg")
  },
  {
    title: "Share it",
    target: "_blank",
    url:
      "https://twitter.com/intent/tweet?text=%F0%9F%A7%BF%20NazarFinder%20-%20Get%20the%20updated%20location%20of%20Madam%20Nazar%20in%20Red%20Dead%20Redemption%202%20Online%20https%3A%2F%2Fnazarfinder.surge.sh%20from%20%40lukyvj",
    onclick: () => {
      ReactGA.event({
        category: "click.link",
        action: "Tweet link"
      });
    },
    emoji: "🐦"
  }
];
