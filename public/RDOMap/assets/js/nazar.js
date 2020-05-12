var MadamNazar = {
  possibleLocations: [
    { "x": "-40.7817", "y": "109.4863", "id": "der" },
    { "x": "-43.1046", "y": "132.8263", "id": "grz" },
    { "x": "-36.5097", "y": "154.1859", "id": "bbr" },
    { "x": "-56.1619", "y": "78.5000", "id": "bgv" },
    { "x": "-63.8927", "y": "105.3496", "id": "hrt_w" },
    { "x": "-60.9622", "y": "130.6067", "id": "hrt_e" },
    { "x": "-65.9688", "y": "150.4468", "id": "blu" },
    { "x": "-84.2973", "y": "82.4512", "id": "tal" },
    { "x": "-90.0802", "y": "135.6969", "id": "scm" },
    { "x": "-100.0742", "y": "49.0765", "id": "cho" },
    { "x": "-104.7679", "y": "85.7222", "id": "hen" },
    { "x": "-123.9039", "y": "34.8213", "id": "rio" },
  ],
  currentLocation: null,
  currentDate: null,

  loadMadamNazar: function () {
    var _nazarParam = getParameterByName('nazar');
    if (_nazarParam < MadamNazar.possibleLocations.length && _nazarParam) {
      MadamNazar.currentLocation = _nazarParam;
      MadamNazar.currentDate = '';
      MadamNazar.addMadamNazar();
    } else {
      $.getJSON('https://pepegapi.jeanropke.net/rdo/nazar')
        .done(function (nazar) {
          MadamNazar.currentLocation = nazar.nazar_id - 1;
          MadamNazar.currentDate = new Date(nazar.date).toLocaleString(Settings.language, {
            day: "2-digit", month: "long", year: "numeric"
          });
          MadamNazar.addMadamNazar();
          console.info('%c[Nazar] Loaded!', 'color: #bada55; background: #242424');
        });
    }
  },

  addMadamNazar: function () {
    if (MadamNazar.currentLocation == null || !enabledCategories.includes('nazar'))
      return;

    var shadow = Settings.isShadowsEnabled ? '<img class="shadow" width="' + 35 * Settings.markerSize + '" height="' + 16 * Settings.markerSize + '" src="./assets/images/markers-shadow.png" alt="Shadow">' : '';
    var marker = L.marker([MadamNazar.possibleLocations[MadamNazar.currentLocation].x, MadamNazar.possibleLocations[MadamNazar.currentLocation].y], {
      icon: L.divIcon({
        iconSize: [35 * Settings.markerSize, 45 * Settings.markerSize],
        iconAnchor: [17 * Settings.markerSize, 42 * Settings.markerSize],
        popupAnchor: [0 * Settings.markerSize, -28 * Settings.markerSize],
        html: `
              <img class="icon" src="./assets/images/icons/nazar.png" alt="Icon">
              <img class="background" src="./assets/images/icons/marker_red.png" alt="Background">
              ${shadow}
            `
      })
    });

    marker.bindPopup(`<h1>${Language.get('menu.madam_nazar')} - ${MadamNazar.currentDate}</h1><p style="text-align: center;">${Language.get('map.madam_nazar.desc').replace('{link}', '<a href="https://twitter.com/MadamNazarIO" target="_blank">@MadamNazarIO</a>')}</p>`, { minWidth: 300 });
    Layers.itemMarkersLayer.addLayer(marker);
  }
};
