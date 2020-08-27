class Marker {
  constructor(text, lat, lng, category, subdata, size, time) {
    this.text = text;
    this.lat = lat;
    this.lng = lng;
    this.category = category;
    this.subdata = subdata;
    this.size = size;
    this.time = time;
    this.title = (() => {
      switch (this.category) {
        case 'plants':
        case 'hideouts':
        case 'daily_locations':
          return Language.get(`map.${this.category}.${this.text}.name`);
        default:
          return Language.get(`map.${this.text}.name`);
      }
    })();
    this.description = (() => {
      switch (this.category) {
        case 'plants':
          return Language.get(`map.plants.desc`).replace(/{plant}/, this.title);
        default:
          return Language.get(`map.${this.category}.desc`);
      }
    })();
    this.isVisible = enabledCategories.includes(this.category);
    this.isCollected = false;
    this.canCollect = !this.isCollected;
  }
}