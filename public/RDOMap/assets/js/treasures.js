var Treasures = {
  // Needed to check against Q param.
  treasures: [
    "bards_crossing_treasure", "benedict_treasure", "blackbone_forest_treasure", "blue_water_marsh_treasure", "brandywine_drop_treasure",
    "burned_town_treasure", "calumet_ravine_treasure", "cattail_pond_treasure", "citadel_rock_treasure", "civil_war_treasure",
    "cumberland_forest_west_treasure", "dakota_river_treasure", "diablo_ridge_treasure", "east_watson_treasure", "gaptooth_treasure",
    "hanging_rock_treasure", "hawks_eye_treasure", "hennigans_central_treasure", "hennigans_north_treasure", "kamassa_river_treasure",
    "lake_isabella_treasure", "little_creek_treasure", "north_clingman_treasure", "north_ridgewood_treasure", "north_tumbleweed_treasure",
    "ocreaghs_run_treasure", "san_luis_treasure", "southren_roanoke_treasure", "west_hill_haven_treasure"
  ],

  enabledTreasures: $.cookie('treasures-enabled') ? $.cookie('treasures-enabled').split(';') : [],
  data: [],
  markers: [],
  load: function () {
    $.getJSON('data/treasures.json?nocache=' + nocache)
      .done(function (data) {
        Treasures.data = data;
        Treasures.set();
      });
    console.info('%c[Treasures] Loaded!', 'color: #bada55; background: #242424');
  },
  set: function (inPreview = false) {
    Treasures.markers = [];
    var crossIcon = L.icon({
      iconUrl: './assets/images/icons/cross.png',
      iconSize: [16, 16],
      iconAnchor: [8, 8]
    });

    $.each(Treasures.data, function (key, value) {
      var snippet = `<h1>${Language.get(value.text)}</h1><button type="button" class="btn btn-info remove-button" onclick="MapBase.removeItemFromMap('${value.text}', '${value.text}', 'treasure')" data-item="${value.text}">${Language.get("map.remove_add")}</button>`;

      var circle = L.circle([value.x, value.y], {
        color: "#fff79900",
        fillColor: "#fff799",
        fillOpacity: 0.5,
        radius: value.radius
      }).bindPopup(snippet, { minWidth: 300 });

      var treasuresCross = [];
      $.each(value.treasures, function (crossKey, crossValue) {
        treasuresCross.push(L.marker([crossValue.x, crossValue.y], {
          icon: crossIcon
        }).bindPopup(snippet, { minWidth: 300 }));
      });

      Treasures.markers.push({
        treasure: value.text,
        circle: circle,
        treasuresCross: treasuresCross
      });
    });

    Treasures.addToMap();
  },

  addToMap: function (inPreview = false) {

    Layers.miscLayer.clearLayers();

    if (!enabledCategories.includes('treasure'))
      return;

    var previewLoc = null;
    $.each(Treasures.markers, function (key, value) {
      if (Treasures.enabledTreasures.includes(value.treasure)) {
        previewLoc = value.marker;

        Layers.miscLayer.addLayer(value.circle);
        $.each(value.treasuresCross, function (crossKey, crossValue) {
          Layers.miscLayer.addLayer(crossValue);
        });
      }
    });

    if (inPreview)
      MapBase.map.setView(previewLoc._latlng, 6);

    Layers.miscLayer.addTo(MapBase.map);
    Menu.refreshTreasures();
  },
  save: function () {
    $.cookie('treasures-enabled', Treasures.enabledTreasures.join(';'), {
      expires: 999
    });
  },
  showHideAll: function (isToHide) {
    if (isToHide) {
      Treasures.enabledTreasures = [];
    } else {
      Treasures.enabledTreasures = Treasures.data.map(_treasure => _treasure.text);
    }
    Treasures.addToMap();
    Treasures.save();
  }
};