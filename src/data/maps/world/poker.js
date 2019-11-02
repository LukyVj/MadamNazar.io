import locations from "../../locales/locations";
import labels from "../../locales/labels";

const poker = [
  {
    name: labels.poker,
    location: {
      name: locations.cities.saintdenis,
      region: locations.regions.bayounwa,
      territory: {
        name: locations.territories.lemoyne[0],
        code: locations.territories.lemoyne[1]
      }
    },
    lat: 53.650081602862954,
    lng: 33.991527557373054
  },
  {
    name: labels.poker,
    location: {
      name: locations.cities.tumbleweed,
      region: locations.regions.gaptoothridge,
      territory: {
        name: locations.territories.newaustin[0],
        code: locations.territories.newaustin[1]
      }
    },
    lat: 26.01401937624252,
    lng: -143.90218734741214
  },
  {
    name: labels.poker,
    location: {
      name: locations.cities.blackwater,
      region: locations.regions.greatplains,
      territory: {
        name: locations.territories.westelizabeth[0],
        code: locations.territories.westelizabeth[1]
      }
    },
    lat: 52.43879844909521,
    lng: -41.29919528961182
  },
  {
    name: labels.poker,
    location: {
      name: locations.pois.flatneckstation,
      region: locations.regions.heartlands,
      territory: {
        name: locations.territories.newhanover[0],
        code: locations.territories.newhanover[1]
      }
    },
    lat: 63.4487636118681,
    lng: -30.62374591827393
  },
  {
    name: labels.poker,
    location: {
      name: locations.cities.valentine,
      region: locations.regions.heartlands,
      territory: {
        name: locations.territories.newhanover[0],
        code: locations.territories.newhanover[1]
      }
    },
    lat: 72.76083453461177,
    lng: -30.139060020446777
  }
];
export default poker;
