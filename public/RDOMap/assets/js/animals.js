class Animal {
  constructor(preliminary, type) {
    Object.assign(this, preliminary);

    this.context = $(`.menu-hidden[data-type=${type}]`);

    this.element = $(`<div class="collectible-wrapper" data-help="item" data-type="${this.key}">`)
      .attr('data-tippy-content', Language.get(`menu.cmpndm.${this.key}`))
      .on('click', () => this.isEnabled = !this.isEnabled)
      .append($(`<img class="collectible-icon" src="./assets/images/icons/game/animals/${this.key}.png">`))
      .append($('<span class="collectible-text disabled">')
        .append($('<p class="collectible">').attr('data-text', `menu.cmpndm.${this.key}`)))
      .translate();

    this.markers = [];
    let self = this;

    if (this.groups != null) {
      this.groups.forEach(_group => {
        if (!AnimalCollection.groups[_group])
          return console.error(`The animal spawns group for ${_group} could not be found.`);
        MapBase.yieldingLoop(AnimalCollection.groups[_group].length, 50, function (i) {
          const _marker = AnimalCollection.groups[_group][i];
          const tempMarker = L.marker([_marker.x, _marker.y], {
            opacity: .75,
            icon: new L.divIcon({
              iconUrl: 'assets/images/icons/animal.png',
              iconSize: [32, 32],
              iconAnchor: [16, 16],
              popupAnchor: [0, -8],
            }),
          });

          let popupContent = Language.get('map.animal_spawns.desc')
            .replace('{animal}', Language.get(`menu.cmpndm.${self.key}`));

          if (_marker.start && _marker.end) {
            const startTime = convertToTime(_marker.start);
            const endTime = convertToTime(_marker.end);
            popupContent = Language.get('map.animal_spawns_timed.desc')
              .replace('{animal}', Language.get(`menu.cmpndm.${self.key}`))
              .replace('{start}', startTime)
              .replace('{end}', endTime);
          }

          let debugDisplayLatLng = $('<small>').text(`Latitude: ${_marker.x} / Longitude: ${_marker.y} / Start: ${_marker.start} / End: ${_marker.end}`);
          tempMarker.bindPopup(
            `<h1>${Language.get('map.animal_spawns.name').replace('{animal}', Language.get(`menu.cmpndm.${self.key}`))}</h1>
            <span class="marker-content-wrapper">
              <p>${popupContent}</p>
            </span>
            ${Settings.isDebugEnabled ? debugDisplayLatLng.prop('outerHTML') : ''}`, { minWidth: 300, maxWidth: 400 });
          self.data.push(tempMarker._latlng);
          self.markers.push(tempMarker);
        }, function () {
        });
      });
    }

    this.element.appendTo(this.context);
  }

  set isEnabled(state) {
    $('[data-type="animals"] .collectible-text').addClass('disabled');
    $('[data-type="birds"] .collectible-text').addClass('disabled');
    $('[data-type="fish"] .collectible-text').addClass('disabled');

    if (state) {
      AnimalCollection.spawnLayer.clearLayers();
      AnimalCollection.heatmapLayer.setData({ data: this.data });
      if (this.markers.length > 0)
        AnimalCollection.spawnLayer.addLayers(this.markers);
      this.element.children('span').removeClass('disabled');
    } else {
      AnimalCollection.heatmapLayer.setData({ data: [] });
      AnimalCollection.spawnLayer.clearLayers();
      this.element.children('span').addClass('disabled');
    }
  }

  get isEnabled() {
    return !this.element.children('span').hasClass('disabled');
  }
}

class AnimalCollection {

  static init() {
    this.heatmapLayer = new HeatmapOverlay({
      radius: 2.5,
      maxOpacity: 0.5,
      minOpacity: 0,
      scaleRadius: true,
      useLocalExtrema: false,
      latField: 'lat',
      lngField: 'lng',
      gradient: {
        0.25: 'rgb(125, 125, 125)',
        0.55: 'rgb(48, 25, 52)',
        1.0: 'rgb(255, 42, 32)',
      },
    });

    this.spawnLayer = L.canvasIconLayer({ zoomAnimation: true });

    this.groups = [];
    this.collection = [];
    this.collectionsData = [];
    this.quickParams = [];

    AnimalCollection.heatmapLayer.addTo(MapBase.map);
    AnimalCollection.spawnLayer.addTo(MapBase.map);

    const animalSpawns = Loader.promises['animal_spawns'].consumeJson(data => this.groups = data);
    const animalHeatmap = Loader.promises['hm'].consumeJson(data => this.collectionsData = data);

    return Promise.all([animalSpawns, animalHeatmap]).then(() => {
      console.info('%c[Animals] Loaded!', 'color: #bada55; background: #242424');
      this.collectionsData.forEach(collection => this.collection.push(new AnimalCollection(collection)));
    });
  }

  constructor(preliminary) {
    Object.assign(this, preliminary);

    this.animals = [];
    this.data.forEach(animal => {
      this.animals.push(new Animal(animal, this.key));
      AnimalCollection.quickParams.push(animal.key);
    });
    Menu.reorderMenu($(`.menu-hidden[data-type=${this.key}]`));
  }
}
