import ReactGA from "react-ga";
import { rudr_favorite } from "../scripts/helpers";
export const navigation = [
  {
    title: "Home",
    url: "/",
    appLink: true,
    onclick: () => {
      ReactGA.event({
        category: "click.link",
        action: "Click Home link"
      });
    }
  },
  //   {
  //     title: "Cycles",
  //     url: "/cycles",
  //     appLink: true,
  //     onclick: () => {
  //       ReactGA.event({
  //         category: "click.link",
  //         action: "Click Cycle link"
  //       });
  //     }
  //   },
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
    }
  },
  {
    title: "About",
    url: "/about",
    appLink: true,
    onclick: () => {
      ReactGA.event({
        category: "click.link",
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
        category: "click.link",
        action: "Click Tweet page link"
      });
    }
  },
  {
    title: "API",
    url: "https://documenter.getpostman.com/view/6602370/SVtN3rnY",
    target: "_blank",
    rel: "noreferrer noopener",
    onclick: () => {
      ReactGA.event({
        category: "click.link",
        action: "Click API link"
      });
    }
  },
  {
    title: "Contact",
    target: "_blank",
    rel: "noreferrer noopener",
    url: "https://twitter.com/FinderNazar",
    onclick: () => {
      ReactGA.event({
        category: "click.link",
        action: "Click Contact link (twitter)"
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
        category: "click.link",
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
        category: "click.link",
        action: "Click Share link"
      });
    }
  }
 */
