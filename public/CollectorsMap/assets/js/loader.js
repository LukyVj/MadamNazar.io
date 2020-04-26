Object.defineProperty(Date.prototype, 'toISOUTCDateString', {
    value: function () { return this.toISOString().split('T')[0]; },
});

class Loader {
    static init(urls) {
        this.promises = {};
        urls.forEach(url => {
            const name = url.split('/').pop().split('.', 1)[0];
            this.promises[name] = new Loader(name, url);
        });
    }
    constructor(name, url) {
        const queryString = {};
        if (!name.startsWith('http')) queryString.nocache = nocache;
        if (name === 'cycles') queryString.date = new Date().toISOUTCDateString();
        this._json = $.getJSON(url, queryString);
    }
    // allow garbage collection of loaded data after use
    consumeJson(...args) {
        const json = this._json;
        delete this._json;
        return json.then(...args);
    }
}

const urls = [
    'data/items_value.json',
    'data/weekly.json',
    'data/cycles.json',
    'data/overlays.json',
    'data/items.json',
    'data/fasttravels.json',
    'https://pepegapi.jeanropke.net/rdo/nazar',
    'data/treasures.json',
];
Loader.init(urls);