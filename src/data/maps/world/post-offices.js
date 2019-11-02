import locations from "../../locales/locations";
import labels from "../../locales/labels";

const post_offices = [
  {
    name: labels.postoffice,
    location: {
      name: locations.pois.benedictpoint,
      region: locations.regions.riobravo,
      territory: {
        name: locations.territories.newaustin[0],
        code: locations.territories.newaustin[1]
      }
    },
    lat: 14.53689579098601,
    lng: -137.76688425768987
  },
  {
    name: labels.postoffice,
    location: {
      name: locations.cities.armadillo,
      region: locations.regions.chollasprings,
      territory: {
        name: locations.territories.newaustin[0],
        code: locations.territories.newaustin[1]
      }
    },
    lat: 31.91078747385958,
    lng: -104.92005322457135
  },
  {
    name: labels.postoffice,
    location: {
      name: locations.cities.strawberry,
      region: locations.regions.bigvalley,
      territory: {
        name: locations.territories.westelizabeth[0],
        code: locations.territories.westelizabeth[1]
      }
    },
    lat: 63.19527639240239,
    lng: -62.002496236695336
  },
  {
    name: labels.postoffice,
    location: {
      name: locations.cities.blackwater,
      region: locations.regions.greatplains,
      territory: {
        name: locations.territories.westelizabeth[0],
        code: locations.territories.westelizabeth[1]
      }
    },
    lat: 52.30194466330438,
    lng: -42.586093017960174
  },
  {
    name: labels.postoffice,
    location: {
      name: locations.pois.riggsstation,
      region: locations.regions.bigvalley,
      territory: {
        name: locations.territories.westelizabeth[0],
        code: locations.territories.westelizabeth[1]
      }
    },
    lat: 61.25508781285158,
    lng: -47.37651548009124
  },
  {
    name: labels.postoffice,
    location: {
      name: locations.pois.wallacestation,
      region: locations.regions.bigvalley,
      territory: {
        name: locations.territories.westelizabeth[0],
        code: locations.territories.westelizabeth[1]
      }
    },
    lat: 69.89038156067211,
    lng: -51.9115201765206
  },
  {
    name: labels.postoffice,
    location: {
      name: locations.cities.valentine,
      region: locations.regions.heartlands,
      territory: {
        name: locations.territories.newhanover[0],
        code: locations.territories.newhanover[1]
      }
    },
    lat: 71.59012987687714,
    lng: -27.416423293368872
  },
  {
    name: labels.postoffice,
    location: {
      name: locations.cities.rhodes,
      region: locations.regions.scarlettmeadows,
      territory: {
        name: locations.territories.lemoyne[0],
        code: locations.territories.lemoyne[1]
      }
    },
    lat: 52.73881208655003,
    lng: 3.3268215464395245
  },
  {
    name: labels.postoffice,
    location: {
      name: locations.pois.emeraldstation,
      region: locations.regions.heartlands,
      territory: {
        name: locations.territories.newhanover[0],
        code: locations.territories.newhanover[1]
      }
    },
    lat: 70.23331514433008,
    lng: 9.867620340247583
  },
  {
    name: labels.postoffice,
    location: {
      name: locations.cities.saintdenis,
      region: locations.regions.bayounwa,
      territory: {
        name: locations.territories.lemoyne[0],
        code: locations.territories.lemoyne[1]
      }
    },
    lat: 51.35645363197236,
    lng: 36.589980945202164
  },
  {
    name: labels.postoffice,
    location: {
      name: locations.cities.vanhorn,
      region: locations.regions.roanokeridge,
      territory: {
        name: locations.territories.newhanover[0],
        code: locations.territories.newhanover[1]
      }
    },
    lat: 71.17454721226319,
    lng: 41.80945653850988
  },
  {
    name: labels.postoffice,
    location: {
      name: locations.cities.annesburg,
      region: locations.regions.roanokeridge,
      territory: {
        name: locations.territories.newhanover[0],
        code: locations.territories.newhanover[1]
      }
    },
    lat: 75.59773072883218,
    lng: 40.62500053197055
  }
];

export default post_offices;
