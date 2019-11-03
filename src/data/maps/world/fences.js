import locations from "../../locales/locations";
import labels from "../../locales/labels";

const fences = [
  {
    name: labels.fence,
    location: {
      name: locations.pois.thieveslanding,
      region: locations.regions.hennigansstead,
      territory: {
        name: locations.territories.newaustin[0],
        code: locations.territories.newaustin[1]
      }
    },
    lat: 37.10530082532282,
    lng: -54.09118652343751
  },
  {
    name: labels.fence,
    location: {
      name: locations.cities.rhodes,
      region: locations.regions.scarlettmeadows,
      territory: {
        name: locations.territories.lemoyne[0],
        code: locations.territories.lemoyne[1]
      }
    },
    lat: 54.72454584313743,
    lng: 5.1737451553344735
  },
  {
    name: labels.fence,
    location: {
      name: locations.pois.emeraldranch,
      region: locations.regions.heartlands,
      territory: {
        name: locations.territories.newhanover[0],
        code: locations.territories.newhanover[1]
      }
    },
    lat: 68.98147620478854,
    lng: 7.484307289123536
  },
  {
    name: labels.fence,
    location: {
      name: locations.cities.saintdenis,
      region: locations.regions.bayounwa,
      territory: {
        name: locations.territories.lemoyne[0],
        code: locations.territories.lemoyne[1]
      }
    },
    lat: 53.97862912121415,
    lng: 38.97425651550294
  },
  {
    name: labels.fence,
    location: {
      name: locations.cities.vanhorn,
      region: locations.regions.roanokeridge,
      territory: {
        name: locations.territories.newhanover[0],
        code: locations.territories.newhanover[1]
      }
    },
    lat: 71.13491509112973,
    lng: 42.58609771728516
  }
];
export default fences;
