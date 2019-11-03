import locations from "../../locales/locations";
import labels from "../../locales/labels";
const stables = [
  {
    name: labels.stable,
    location: {
      name: locations.cities.tumbleweed,
      region: locations.regions.gaptoothridge,
      territory: {
        name: locations.territories.newaustin[0],
        code: locations.territories.newaustin[1]
      }
    },
    lat: 23.444112623255904,
    lng: -144.09457683563235
  },
  {
    name: labels.stable,
    location: {
      name: locations.cities.strawberry,
      region: locations.regions.bigvalley,
      territory: {
        name: locations.territories.westelizabeth[0],
        code: locations.territories.westelizabeth[1]
      }
    },
    lat: 61.3453954936966,
    lng: -63.21833610534669
  },
  {
    name: labels.stable,
    location: {
      name: locations.cities.blackwater,
      region: locations.regions.greatplains,
      territory: {
        name: locations.territories.westelizabeth[0],
        code: locations.territories.westelizabeth[1]
      }
    },
    lat: 51.77761222298531,
    lng: -42.528076171875
  },
  {
    name: labels.stable,
    location: {
      name: locations.pois.dewberrycreek,
      region: locations.regions.scarlettmeadows,
      territory: {
        name: locations.territories.lemoyne[0],
        code: locations.territories.lemoyne[1]
      }
    },
    lat: 65.02085606065135,
    lng: 2.910218238830567
  },
  {
    name: labels.stable,
    location: {
      name: locations.cities.saintdenis,
      region: locations.regions.bayounwa,
      territory: {
        name: locations.territories.lemoyne[0],
        code: locations.territories.lemoyne[1]
      }
    },
    lat: 50.62793161872617,
    lng: 31.251897811889652
  },
  {
    name: labels.stable,
    location: {
      name: locations.cities.vanhorn,
      region: locations.regions.roanokeridge,
      territory: {
        name: locations.territories.newhanover[0],
        code: locations.territories.newhanover[1]
      }
    },
    lat: 72.7068520335299,
    lng: 41.25876903533936
  },
  {
    name: labels.stable,
    location: {
      name: locations.cities.valentine,
      region: locations.regions.heartlands,
      territory: {
        name: locations.territories.newhanover[0],
        code: locations.territories.newhanover[1]
      }
    },
    lat: 72.69455000224696,
    lng: -31.41145706176758
  }
];

export default stables;
