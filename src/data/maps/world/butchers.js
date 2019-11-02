import locations from "../../locales/locations";
import labels from "../../locales/labels";

const butchers = [
  {
    name: labels.butcher,
    location: {
      name: locations.cities.tumbleweed,
      region: locations.regions.gaptoothridge,
      territory: {
        name: locations.territories.newaustin[0],
        code: locations.territories.newaustin[1]
      }
    },
    lat: 25.356785591376877,
    lng: -143.85837078094485
  },
  {
    name: labels.butcher,
    location: {
      name: locations.cities.strawberry,
      region: locations.regions.bigvalley,
      territory: {
        name: locations.territories.westelizabeth[0],
        code: locations.territories.westelizabeth[1]
      }
    },
    lat: 63.09361266601283,
    lng: -61.77067279815674
  },
  {
    name: labels.butcher,
    location: {
      name: locations.cities.blackwater,
      region: locations.regions.greatplains,
      territory: {
        name: locations.territories.westelizabeth[0],
        code: locations.territories.westelizabeth[1]
      }
    },
    lat: 53.033729684044744,
    lng: -39.901614189147956
  },
  {
    name: labels.butcher,
    location: {
      name: locations.cities.valentine,
      region: locations.regions.heartlands,
      territory: {
        name: locations.territories.newhanover[0],
        code: locations.territories.newhanover[1]
      }
    },
    lat: 72.51966243098407,
    lng: -30.895571708679203
  },
  {
    name: labels.butcher,
    location: {
      name: locations.cities.rhodes,
      region: locations.regions.scarlettmeadows,
      territory: {
        name: locations.territories.lemoyne[0],
        code: locations.territories.lemoyne[1]
      }
    },
    lat: 52.97831246925311,
    lng: 4.9147939682006845
  },
  {
    name: labels.butcher,
    location: {
      name: locations.cities.saintdenis,
      region: locations.regions.bayounwa,
      territory: {
        name: locations.territories.lemoyne[0],
        code: locations.territories.lemoyne[1]
      }
    },
    lat: 52.25441982219797,
    lng: 38.085393905639656
  }
];

export default butchers;
