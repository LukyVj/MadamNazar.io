import locations from "../../locales/locations";
import labels from "../../locales/labels";
const barbers = [
  {
    name: labels.barber,
    location: {
      name: locations.cities.blackwater,
      region: locations.regions.greatplains,
      territory: {
        name: locations.territories.westelizabeth[0],
        code: locations.territories.westelizabeth[1]
      }
    },
    lat: 51.80014956715253,
    lng: -41.28404617309571
  },
  {
    name: labels.barber,
    location: {
      name: locations.cities.valentine,
      region: locations.regions.heartlands,
      territory: {
        name: locations.territories.newhanover[0],
        code: locations.territories.newhanover[1]
      }
    },
    lat: 51.80014956715253,
    lng: -41.28404617309571
  },
  {
    name: labels.barber,
    location: {
      name: locations.cities.saintdenis,
      region: locations.regions.bayounwa,
      territory: {
        name: locations.territories.lemoyne[0],
        code: locations.territories.lemoyne[1]
      }
    },
    lat: 51.80014956715253,
    lng: -41.28404617309571
  }
];

export default barbers;
