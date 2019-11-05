import locations from "../../locales/locations";
import labels from "../../locales/labels";

const tailors = [
  {
    name: labels.tailor,
    location: {
      name: locations.cities.saintdenis,
      region: locations.regions.bayounwa,
      territory: {
        name: locations.territories.lemoyne[0],
        code: locations.territories.lemoyne[1]
      }
    },
    lat: 54.4111883897161,
    lng: 32.395248413085945
  },
  {
    name: labels.tailor,
    location: {
      name: locations.cities.blackwater,
      region: locations.regions.greatplains,
      territory: {
        name: locations.territories.westelizabeth[0],
        code: locations.territories.westelizabeth[1]
      }
    },
    lat: 52.764397896887296,
    lng: -40.12940883636475
  }
];
export default tailors;
