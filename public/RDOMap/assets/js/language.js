jQuery.fn.translate = function () {
  return Language.translateDom(this);
};

var Language = {
  data: {},
  availableLanguages: ['en', 'af', 'ar', 'ca', 'cs', 'da', 'de', 'el', 'en-GB', 'es', 'es-MX', 'fi', 'fr', 'he', 'hu', 'it', 'ja', 'ko', 'nl', 'no', 'pl', 'pt', 'pt-BR', 'ro', 'ru', 'sr', 'sv', 'th', 'tr', 'uk', 'vi', 'zh-Hans', 'zh-Hant'],
  progress: {},

  init: function () {
    'use strict';
    let langs = ['en'];

    if (Settings.language !== 'en') {
      langs.push(Settings.language);
    }

    langs.forEach(language => {
      $.ajax({
        url: `./langs/${language.replace('-', '_')}.json?nocache=${nocache}&date=${new Date().toISOUTCDateString()}`,
        async: false,
        dataType: 'json',
        success: function (json) {
          let result = {};

          for (let propName in json) {
            if (json[propName] !== '' && ($.isEmptyObject(Language.data.en) || Language.data.en[propName] !== json[propName])) {
              result[propName] = json[propName];
            }
          }

          Language.data[language] = result;
        },
      });
    });

    return Loader.promises['lang_progress'].consumeJson(data => {
      this.progress = data;
      this.updateProgress();
    });
  },

  get: function (transKey, optional) {
    'use strict';
    let translation = false;

    if (transKey === 'GitHub') {
      translation = '<a href="https://github.com/jeanropke/RDR2CollectorsMap/issues" target="_blank">GitHub</a>';
    } else if (transKey === 'Discord') {
      translation = '<a href="https://discord.gg/WWru8cP" target="_blank">Discord</a>';
    } else if (transKey === 'int.random_spot.link') {
      translation = '<a href="https://github.com/jeanropke/RDR2CollectorsMap/wiki/Random-Item-Possible-Loot" target="_blank">';
    } else if (transKey === 'int.end.link') {
      translation = '</a>';
    } else if (transKey === 'collection') {
      transKey = `weekly.desc.${weeklySetData.current}`;
    }

    translation =
      translation ||
      Language.data[Settings.language][transKey] ||
      Language.data.en[transKey] ||
      (optional ? '' : transKey);

    return translation.replace(/\{([\w.]+)\}/g, (full, key) => {
      const translation = this.get(key);
      return translation === key ? `{${key}}` : translation;
    });
  },

  translateDom: function (context) {
    'use strict';
    $('[data-text]', context).html(function () {
      const $this = $(this);
      return Language.get($this.attr('data-text'), $this.data('text-optional'));
    });
    return context;
  },

  setMenuLanguage: function () {
    'use strict';

    if (Language.data[Settings.language] === undefined) {
      $.ajax({
        url: `./langs/${Settings.language.replace('-', '_')}.json?nocache=${nocache}&date=${new Date().toISOUTCDateString()}`,
        async: false,
        dataType: 'json',
        success: function (json) {
          let result = {};

          for (let propName in json) {
            if (json[propName] !== '' && ($.isEmptyObject(Language.data.en) || Language.data.en[propName] !== json[propName])) {
              result[propName] = json[propName];
            }
          }

          Language.data[Settings.language] = result;
        },
      });
    }

    const wikiBase = 'https://github.com/jeanropke/RDR2CollectorsMap/wiki/';
    const wikiPages = {
      'en': 'RDO-Collectors-Map-User-Guide-(English)',
      'de': 'RDO-Sammler-Landkarte-Benutzerhandbuch-(German)',
      'fr': "RDO-Collectors-Map-Guide-d'Utilisateur-(French)",
      'pt': 'Guia-do-Usu%C3%A1rio---Mapa-de-Colecionador-(Portuguese)',
    };
    const wikiLang = Settings.language in wikiPages ? Settings.language : 'en';
    $('.wiki-page').attr('href', wikiBase + wikiPages[wikiLang]);

    $('.leaflet-control-layers-base label span').each((key, value) => {
      var $this = $(value);
      $this.text(' ' + Language.get($this.text().trim()));
    });

    this.translateDom();

    $('#search').attr('placeholder', Language.get('menu.search_placeholder'));

    FME.update();
    this.updateProgress();
  },

  updateProgress: function () {
    $('#language option').each((key, value) => {
      const item = $(value).attr('value').replace('-', '_');
      let percent = this.progress[item];

      if (item === 'en') percent = 100;
      if (!percent) percent = 0;

      $(value).text(`${Language.get('menu.lang_' + item)} (${percent}%)`);
    });

    let thisProg = this.progress[Settings.language.replace('-', '_')];
    if (Settings.language === 'en') thisProg = 100;
    if (!thisProg) thisProg = 0;
    $('#translation-progress').text(Language.get('menu.translate_progress').replace('{progress}', thisProg));
  },

  hasTranslation: function (string) {
    return this.get(string) !== string;
  }
};
