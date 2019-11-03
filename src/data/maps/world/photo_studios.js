import locations from "../../locales/locations";
import labels from "../../locales/labels";

const photo_studios = [
  {
    name: labels.photostudio,
    location: {
      name: locations.cities.blackwater,
      region: locations.regions.greatplains,
      territory: {
        name: locations.territories.westelizabeth[0],
        code: locations.territories.westelizabeth[1]
      }
    },
    lat: 51.677451889075556,
    lng: -41.25915527343751
  },
  {
    name: labels.photostudio,
    location: {
      name: locations.cities.saintdenis,
      region: locations.regions.bayounwa,
      territory: {
        name: locations.territories.lemoyne[0],
        code: locations.territories.lemoyne[1]
      }
    },
    lat: 54.986183635298914,
    lng: 36.1605978012085
  }
];
export default photo_studios;
