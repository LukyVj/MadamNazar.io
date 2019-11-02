import locations from "../../locales/locations";
import labels from "../../locales/labels";

const doctors = [
  {
    name: labels.doctors,
    location: {
      name: locations.cities.valentine,
      region: locations.regions.heartlands,
      territory: {
        name: locations.territories.newhanover[0],
        code: locations.territories.newhanover[1]
      }
    },
    lat: 72.77720833205106,
    lng: -29.76256370544434
  },
  {
    name: labels.doctors,
    location: {
      name: locations.cities.saintdenis,
      region: locations.regions.bayounwa,
      territory: {
        name: locations.territories.lemoyne[0],
        code: locations.territories.lemoyne[1]
      }
    },
    lat: 53.588582047647094,
    lng: 35.96374511718751
  }
];
export default doctors;
