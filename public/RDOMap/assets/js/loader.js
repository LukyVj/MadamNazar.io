Object.defineProperty(Date.prototype, 'toISOUTCDateString', {
  value: function () {
    return this.toISOString().split('T')[0];
  },
});

class Loader {
  static init(urls) {
    this.urls = urls;
    this.promises = {};
    urls.forEach(url => {
      const name = url.split('/').pop().split('.', 1)[0];
      this.promises[name] = new Loader(name, url);
    });

    /*
    Similar to DOMContentLoaded: to be fired once cycles, items, collections, treasures, ...
    are loaded and initialized. Can be used for final view updates which depend on data.
    This promise is driven by the promises of all loaders and init functions providing data
    for the map model. – Use like:
    Loader.mapModelLoaded.then(callback);
    */
    this.mapModelLoaded = new Promise(resolve => this.resolveMapModelLoaded = resolve);
  }
  constructor(name, url, customNoCache = null) {
    const queryString = {};
    if (!url.startsWith('http')) queryString.nocache = customNoCache || nocache;
    else queryString.nocache = customNoCache || new Date(Date.now() - 21600000).toISOUTCDateString();
    this._json = $.getJSON(url, queryString);
  }
  // allow garbage collection of loaded data after use
  consumeJson(...args) {
    const json = this._json;
    delete this._json;
    return json.then(...args);
  }
  static reloadData(name) {
    delete this.promises[name];
    const url = this.urls.find(url => url.split('/').pop().split('.', 1)[0] === name);
    this.promises[name] = new Loader(name, url, Date.now());
  }
}

const urls = [
  'data/encounters.json',
  'data/fme.json',
  'data/hm.json',
  'data/animal_spawns.json',
  'data/animal_legendary.json',
  'data/overlays.json',
  'data/overlays_beta.json',
  'data/items.json',
  'data/discoverables.json',
  'data/fasttravels.json',
  'data/shops.json',
  'data/camps.json',
  'data/treasures.json',
  'data/plants.json',
  'data/gfh.json',
  'https://pepegapi.jeanropke.net/v2/rdo/nazar',
  'data/possible_dailies.json',
  'https://pepegapi.jeanropke.net/v2/rdo/dailies'
];
Loader.init(urls);
