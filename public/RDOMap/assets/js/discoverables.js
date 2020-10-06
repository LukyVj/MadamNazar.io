class Discoverable {
  static init() {
    this.layer = L.layerGroup();
    this.overlays = [];

    if (MapBase.map.getZoom() > 5)
      Discoverable.layer.addTo(MapBase.map);

    MapBase.map.on('zoomend', function (e) {
      if (MapBase.map.getZoom() > 5)
        Discoverable.layer.addTo(MapBase.map);
      else
        Discoverable.layer.remove();
    });

    return Loader.promises['discoverables'].consumeJson(data => {
      data.forEach(item => {
        this.overlays.push(item);
      });
      console.info(`%c[Discoverables] Loaded!`, 'color: #bada55; background: #242424');
    });
  }

  static createOverlays() {
    Discoverable.layer.clearLayers();
    this.overlays.forEach(item => {
      var overlay = `assets/overlays/${(MapBase.isDarkMode ? 'dark' : 'normal')}/discoveries/${item.name}.png?nocache=${nocache}`;
      let offset = 100;
      var tempMarker = L.imageOverlay(overlay, [[item.lat - item.height / offset, item.lng - item.width / offset], [item.lat + item.height / offset, item.lng + item.width / offset]], {
        opacity: Settings.markerOpacity
      });
      Discoverable.layer.addLayer(tempMarker);
    });
  }

  set onMap(state) {
    if (state) {
      if (MapBase.map.getZoom() > 5)
        Discoverable.layer.addTo(MapBase.map);
      localStorage.setItem(`rdo:discoverables`, 'true');
    } else {
      Discoverable.layer.remove();
      localStorage.removeItem(`rdo:discoverables`);
    }
  }
  get onMap() {
    return !!localStorage.getItem(`rdo:discoverables`);
  }
}