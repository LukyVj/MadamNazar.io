import locations from "../../locales/locations";
import labels from "../../locales/labels";
const fishing_shops = [
  {
    name: labels.fishingshop,
    location: {
      name: locations.pois.lagras,
      region: locations.regions.bluewatermarsh,
      territory: {
        name: locations.territories.lemoyne[0],
        code: locations.territories.lemoyne[1]
      }
    },
    lat: 60.80625053409105,
    lng: 23.746476173400882
  }
];

export default fishing_shops;
