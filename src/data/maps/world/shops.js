import locations from "../../locales/locations";
import labels from "../../locales/labels";

const shops = [
  {
    name: labels.shop,
    location: {
      name: locations.cities.tumbleweed,
      region: locations.regions.gaptoothridge,
      territory: {
        name: locations.territories.newaustin[0],
        code: locations.territories.newaustin[1]
      }
    },
    lat: 25.531947603185277,
    lng: -143.3158349990845
  },
  {
    name: labels.shop,
    location: {
      name: locations.cities.armadillo,
      region: locations.regions.chollasprings,
      territory: {
        name: locations.territories.newaustin[0],
        code: locations.territories.newaustin[1]
      }
    },
    lat: 31.560033939264105,
    lng: -103.97782802581789
  },
  {
    name: labels.shop,
    location: {
      name: locations.cities.strawberry,
      region: locations.regions.bigvalley,
      territory: {
        name: locations.territories.westelizabeth[0],
        code: locations.territories.westelizabeth[1]
      }
    },
    lat: 63.12647325472224,
    lng: -62.59803771972657
  },
  {
    name: labels.shop,
    location: {
      name: locations.cities.blackwater,
      region: locations.regions.greatplains,
      territory: {
        name: locations.territories.westelizabeth[0],
        code: locations.territories.westelizabeth[1]
      }
    },
    lat: 52.35358647607454,
    lng: -40.5999755859375
  },
  {
    name: labels.shop,
    location: {
      name: locations.pois.wallacestation,
      region: locations.regions.bigvalley,
      territory: {
        name: locations.territories.westelizabeth[0],
        code: locations.territories.westelizabeth[1]
      }
    },
    lat: 69.91415320485274,
    lng: -51.9049072265625
  },
  {
    name: labels.shop,
    location: {
      name: locations.cities.valentine,
      region: locations.regions.heartlands,
      territory: {
        name: locations.territories.newhanover[0],
        code: locations.territories.newhanover[1]
      }
    },
    lat: 72.75659879181859,
    lng: -30.55478096008301
  },
  {
    name: labels.shop,
    location: {
      name: locations.cities.rhodes,
      region: locations.regions.scarlettmeadows,
      territory: {
        name: locations.territories.lemoyne[0],
        code: locations.territories.lemoyne[1]
      }
    },
    lat: 52.77138267880502,
    lng: 5.524749755859376
  },
  {
    name: labels.shop,
    location: {
      name: locations.cities.saintdenis,
      region: locations.regions.bayounwa,
      territory: {
        name: locations.territories.lemoyne[0],
        code: locations.territories.lemoyne[1]
      }
    },
    lat: 52.435344987934336,
    lng: 38.200621604919434
  }
];

export default shops;
