import ReactGA from "react-ga";
export const resources = [
  {
    type: "websites",
    content: [
      {
        title: "RDR2 Collector Map",
        description:
          "The famous Red dead redemption interactive map for collectors",
        author: {
          name: "Jean Ropke",
          url: "https://twitter.com/_jeanropke"
        },
        url: "https://jeanropke.github.io/RDR2CollectorsMap/",
        onclick: () => {
          ReactGA.event({
            category: "click.resources.link",
            action: "Click https://jeanropke.github.io/RDR2CollectorsMap/"
          });
        }
      },
      {
        title: "Red dead redemption 2 map",
        description: "Interactive Map of all RDR2 Locations",
        author: {
          name: "Unknown",
          url: "#"
        },
        url: "https://rdr2map.com/",
        onclick: () => {
          ReactGA.event({
            category: "click.resources.link",
            action: "Click https://rdr2map.com/"
          });
        }
      },
      {
        title: "RDO Map",
        description:
          "An other Interactive Map of all Lootables In Red Dead Online",
        author: {
          name: "LawlaffTV",
          url: "https://twitter.com/LawlaffTV"
        },
        url: "https://www.rdomap.com/",
        onclick: () => {
          ReactGA.event({
            category: "click.resources.link",
            action: "Click RDO Map"
          });
        }
      },
      {
        title: "Red dead Collector",
        description:
          "This website help you find the elusive Madam Nazar and her hidden treasures in Red Dead Online",
        author: {
          name: "timbalanced",
          url: "https://twitter.com/timbalanced"
        },
        url: "http://reddeadcollector.com",
        onclick: () => {
          ReactGA.event({
            category: "click.resources.link",
            action: "Click http://reddeadcollector.com"
          });
        }
      },
      {
        title: "Red dead Dailies",
        description:
          "This is a read-only subreddit that will be used to supplement & share the daily content posted on /r/RedDeadOnline",
        author: {
          name: "Reddit",
          url: "https://www.reddit.com/r/RedDeadDailies"
        },
        url: "https://www.reddit.com/r/RedDeadDailies",
        onclick: () => {
          ReactGA.event({
            category: "click.resources.link",
            action: "Click https://www.reddit.com/r/RedDeadDailies"
          });
        }
      },
      {
        title: "Red Dead Redemption outage map",
        description:
          "Shows on a worldmap if Red dead redemption 2 servers are down",
        author: {
          name: "DownDetector",
          url: "https://downdetector.com/status/red-dead-redemption/map/"
        },
        url: "https://downdetector.com/status/red-dead-redemption/map/",
        onclick: () => {
          ReactGA.event({
            category: "click.resources.link",
            action: "Click DownDetector"
          });
        }
      }
    ]
  },
  {
    type: "videos",
    content: [
      {
        title:
          "60 Second - Red Dead Online Daily Challenges Guide + MadamNazar Location",
        description: "Daily videos helping for the daily challenges",
        author: {
          name: "SethStar16T",
          url: "https://twitter.com/SethStar16T"
        },
        url: "https://www.youtube.com/channel/UCeaZMXEpCzrzOXVtAyIl49A/videos",
        onclick: () => {
          ReactGA.event({
            category: "click.resources.link",
            action:
              "Click https://www.youtube.com/channel/UCeaZMXEpCzrzOXVtAyIl49A/videos"
          });
        }
      }
    ]
  },
  {
    type: "Data sheets",
    content: [
      {
        title: "RDR2:O Compendium",
        description: "Bounty Hunter, Trader, & Collector",
        author: {
          name: "CaliMeatWagon",
          url: "https://twitter.com/CMW_Gaming"
        },
        url:
          "https://docs.google.com/spreadsheets/d/10Bhm1vCaElMq5QqHFdLgbjSSyb2RnI0TbdD375si6UY",
        onclick: () => {
          ReactGA.event({
            category: "click.resources.link",
            action:
              "Click Compendium (https://docs.google.com/spreadsheets/d/10Bhm1vCaElMq5QqHFdLgbjSSyb2RnI0TbdD375si6UY)"
          });
        }
      }
    ]
  }
];
