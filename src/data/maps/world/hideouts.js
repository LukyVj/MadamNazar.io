import locations from "../../locales/locations";
import labels from "../../locales/labels";

const hideouts = [
  {
    name: labels.hideout,
    location: { name: "bacchus station", region: "TDF",territory: {name: "TDF", code: "TDF"}},
    lat: 77.61802193340027,
    lng: -11.285533905029299
  },
  {
    name: labels.hideout,
    location: { name: "clemens point", region: "TDF",territory: {name: "TDF", code: "TDF"}},
    lat: 54.151678438905236,
    lng: -6.530342102050782
  },
  {
    name: labels.hideout,
    location: { name: "colter", region: "TDF",territory: {name: "TDF", code: "TDF"}},
    lat: 80.73858052559186,
    lng: -51.906709671020515
  },
  {
    name: labels.hideout,
    location: { name: "cumberland falls", region: "TDF",territory: {name: "TDF", code: "TDF"}},
    lat: 70.56499103994067,
    lng: -45.83884776861553
  },
  {
    name: labels.hideout,
    location: { name: "Ewing Basin", region: "TDF",territory: {name: "TDF", code: "TDF"}},
    lat: 76.02194140764563,
    lng: -64.9048989421125
  },
  {
    name: labels.hideout,
    location: { name: "Fort Mercer", region: "TDF",territory: {name: "TDF", code: "TDF"}},
    lat: 15.17851229171207,
    lng: -115.17770204670698
  },
  {
    name: labels.hideout,
    location: { name: "Hanging Dog Ranch", region: "TDF",territory: {name: "TDF", code: "TDF"}},
    lat: 72.23941523046344,
    lng: -71.7407163899975
  },
  {
    name: labels.hideout,
    location: { name: "Jorge's Gap", region: "TDF",territory: {name: "TDF", code: "TDF"}},
    lat: 28.163275830669768,
    lng: -113.55545181570785
  },
  {
    name: labels.hideout,
    location: { name: "lakay", region: "TDF",territory: {name: "TDF", code: "TDF"}},
    lat: 59.43909681676301,
    lng: 25.95938822429931
  },
  {
    name: labels.hideout,
    location: { name: "the loft", region: "TDF",territory: {name: "TDF", code: "TDF"}},
    lat: 78.75206542044229,
    lng: 18.265262366860632
  },
  {
    name: labels.hideout,
    location: { name: "mount hagen", region: "TDF",territory: {name: "TDF", code: "TDF"}},
    lat: 75.44302174779855,
    lng: -56.50510924980121
  },
  {
    name: labels.hideout,
    location: { name: "quacker's cove", region: "TDF",territory: {name: "TDF", code: "TDF"}},
    lat: 44.147478683295844,
    lng: -48.429121639758755
  },
  {
    name: labels.hideout,
    location: { name: "rattlesnake hollow", region: "TDF",territory: {name: "TDF", code: "TDF"}},
    lat: 39.65368064327461,
    lng: -112.51948754404907
  },
  {
    name: labels.hideout,
    location: { name: "sea of coronado", region: "TDF",territory: {name: "TDF", code: "TDF"}},
    lat: 12.569726977240354,
    lng: -159.99784469604495
  },
  {
    name: labels.hideout,
    location: { name: "solomon's folly", region: "TDF",territory: {name: "TDF", code: "TDF"}},
    lat: 10.613031253342964,
    lng: -141.99422300626154
  },
  {
    name: labels.hideout,
    location: { name: "twin rocks", region: "TDF",territory: {name: "TDF", code: "TDF"}},
    lat: 40.05127080263306,
    lng: -109.16154017275743
  },
  {
    name: labels.hideout,
    location: { name: "willard's rest", region: "TDF",territory: {name: "TDF", code: "TDF"}},
    lat: 79.81187718411466,
    lng: 41.94203935873498
  },
  {
    name: labels.hideout,
    location: { name: "North of Manteca Falls", region: "TDF",territory: {name: "TDF", code: "TDF"}},
    lat: 30.32902735042595,
    lng: -55.54687500000001
  },
  {
    name: labels.hideout,
    location: { name: "South of tall trees", region: "TDF",territory: {name: "TDF", code: "TDF"}},
    lat: 44.47152122299265,
    lng: -68.90625000000001
  },
  {
    name: labels.hideout,
    location: { name: "Hennigan Stead", region: "TDF",territory: {name: "TDF", code: "TDF"}},
    lat: 36.251472021249235,
    lng: -82.85888671875001
  },
  {
    name: labels.hideout,
    location: { name: "Gaptooth Ridge", region: "TDF",territory: {name: "TDF", code: "TDF"}},
    lat: 29.481298237025918,
    lng: -151.43923759460452
  },
  {
    name: labels.hideout,
    location: { name: "South east of Bolger Glade", region: "TDF",territory: {name: "TDF", code: "TDF"}},
    lat: 44.21487875171158,
    lng: 18.17619323730469
  },
  {
    name: labels.hideout,
    location: { name: "Cumberland Forest", region: "TDF",territory: {name: "TDF", code: "TDF"}},
    lat: 75.39236881734969,
    lng: -24.978103637695316
  },
  {
    name: labels.hideout,
    location: { name: "Kamassa River, New Hanover", region: "TDF",territory: {name: "TDF", code: "TDF"}},
    lat: 69.1693348483684,
    lng: 29.93233680725098
  },
  {
    name: labels.hideout,
    location: { name: "Kamassa River, Bayou Nwa", region: "TDF",territory: {name: "TDF", code: "TDF"}},
    lat: 58.70378868759623,
    lng: 12.095861434936523
  },
  {
    name: labels.hideout,
    location: { name: "Kamassa River, Bluewater Marsh", region: "TDF",territory: {name: "TDF", code: "TDF"}},
    lat: 66.99441633120212,
    lng: 31.855545043945316
  },
  {
    name: labels.hideout,
    location: { name: "Upper Montana River, West Elizabeth", region: "TDF",territory: {name: "TDF", code: "TDF"}},
    lat: 57.50051551654672,
    lng: -57.74688720703126
  },
  {
    name: labels.hideout,
    location: { name: "South of Cumberland forest", region: "TDF",territory: {name: "TDF", code: "TDF"}},
    lat: 73.91348142950415,
    lng: -19.04265403747559
  },
  {
    name: labels.hideout,
    location: { name: "Manteca Falls", region: "TDF",territory: {name: "TDF", code: "TDF"}},
    lat: 28.304380682962783,
    lng: -59.76562500000001
  }
];

export default hideouts;
