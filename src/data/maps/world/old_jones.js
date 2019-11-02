import locations from "../../locales/locations";
import labels from "../../locales/labels";
const old_jones = [
  {
    name: labels.oldjones,
    location: {
      name: locations.cities.annesburg,
      region: locations.regions.roanokeridge,
      territory: {
        name: locations.territories.newhanover[0],
        code: locations.territories.newhanover[1]
      }
    },
    lat: 75.83670737657269,
    lng: 34.094691665232624
  },
  {
    name: labels.oldjones,
    location: {
      name: locations.cities.armadillo,
      region: locations.regions.chollasprings,
      territory: {
        name: locations.territories.newaustin[0],
        code: locations.territories.newaustin[1]
      }
    },
    lat: 28.548036807604255,
    lng: -102.828426361084
  },
  {
    name: labels.oldjones,
    location: {
      name: locations.pois.riggsstation,
      region: locations.regions.bigvalley,
      territory: {
        name: locations.territories.westelizabeth[0],
        code: locations.territories.westelizabeth[1]
      }
    },
    lat: 60.83865868114196,
    lng: -50.85897445678712
  }
];

export default old_jones;
