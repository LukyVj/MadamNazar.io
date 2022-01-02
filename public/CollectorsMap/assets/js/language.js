jQuery.fn.translate = function () {
  return Language.translateDom(this);
};
jQuery.fn.findWithSelf = function (...args) {
  return this.pushStack(this.find(...args).add(this.filter(...args)));
};

const Language = {
  data: {},
  availableLanguages: ['en', 'af', 'ar', 'ca', 'cs', 'da', 'de', 'el', 'en-GB', 'es', 'es-MX', 'fi', 'fr', 'he', 'hu', 'it', 'ja', 'ko', 'no', 'pl', 'pt', 'pt-BR', 'ro', 'ru', 'sr', 'sv', 'th', 'tr', 'uk', 'vi', 'zh-Hans', 'zh-Hant'],
  progress: {},

  init: function () {
    'use strict';
    const langs = ['en'];

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

          for (const propName in json) {
            if (json[propName] !== "" && ($.isEmptyObject(Language.data.en) || Language.data.en[propName] !== json[propName])) {
              result[propName] = json[propName];
            }
          }

          Language.data[language] = result;
        }
      });
    });

    return Loader.promises['lang_progress'].consumeJson(data => {
      this.progress = data;
      this.updateProgress();
    });
  },

  _links: {
    'GitHub': ['https://github.com/jeanropke/RDR2CollectorsMap/issues', 'GitHub'],
    'Discord': ['https://discord.gg/WWru8cP', 'Discord'],
    'int.nazar.link': ['https://twitter.com/MadamNazarIO', '@MadamNazarIO'],
    'int.random_spot.link': ['https://github.com/jeanropke/RDR2CollectorsMap/wiki/Random-Item-Possible-Loot', 'Random item possible loot'],
    'int.naturalist_faq.link': ['https://github.com/jeanropke/RDR2CollectorsMap/wiki/Naturalist-Update-Changes'],
    'int.rdo.overview': ['https://socialclub.rockstargames.com/games/rdo/overview']
  },

  _externalLink: function (key) {
    'use strict';
    const [url, text] = Language._links[key];
    return `<a href="${url}" target="_blank">${text ? `${text}</a>` : ''}`;
  },

  get: function (transKey, optional) {
    'use strict';
    let translation = false;

    if (Settings.isDebugEnabled) optional = false;

    if (Language._links.propertyIsEnumerable(transKey)) {
      translation = Language._externalLink(transKey);
    } else if (transKey === 'int.end.link') {
      translation = '</a>';
    } else if (transKey === 'collection') {
      transKey = Weekly.current ? `weekly.desc.${Weekly.current.weeklyId}` : '';
    }

    if (translation) {
      translation = translation.replace('{0}', optional);
    } else if (Language.data[Settings.language] && Language.data[Settings.language][transKey]) {
      translation = Language.data[Settings.language][transKey];
    } else if (Language.data.en && Language.data.en[transKey]) {
      translation = Language.data.en[transKey];
    } else {
      translation = (optional ? '' : transKey);
    }

    return translation.replace(/\{([\w.]+)\}/g, (full, key) => {
      const translation = this.get(key);
      return translation === key ? `{${key}}` : translation;
    });
  },

  translateDom: function (context) {
    'use strict';
    $(context || document).findWithSelf('[data-text]').html(function () {
      const $this = $(this);
      const string = Language.get($this.attr('data-text'), $this.data('text-optional'));

      // Don't dump raw variables out to the user here, instead make them appear as if they are loading.
      return string.replace(/\{([\w.]+)\}/g, '---');
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

          for (const propName in json) {
            if (json[propName] !== "" && ($.isEmptyObject(Language.data.en) || Language.data.en[propName] !== json[propName])) {
              result[propName] = json[propName];
            }
          }

          Language.data[Settings.language] = result;
        }
      });
    }

    const wikiBase = 'https://github.com/jeanropke/RDR2CollectorsMap/wiki/';
    const wikiPages = {
      'en': 'RDO-Collectors-Map-User-Guide-(English)',
      'de': 'RDO-Sammler-Landkarte-Benutzerhandbuch-(German)',
      'fr': 'RDO-Collectors-Map-Guide-d\'Utilisateur-(French)',
      'pt': 'Guia-do-Usu%C3%A1rio---Mapa-de-Colecionador-(Portuguese)',
    };
    const wikiLang = Settings.language in wikiPages ? Settings.language : 'en';
    $('.wiki-page').attr('href', wikiBase + wikiPages[wikiLang]);

    this.translateDom();

    $('#search').attr("placeholder", Language.get('menu.search_placeholder'));

    FME.update();
    this.updateProgress();
  },

  updateProgress: function () {
    $('#language option').each((key, value) => {
      const item = $(value).attr('value').replace('-', '_');
      let percent = this.progress[item];

      if (item === "en") percent = 100;
      if (!percent) percent = 0;

      $(value).text(`${Language.get('menu.lang_' + item)} (${percent}%)`);
    });

    let thisProg = this.progress[Settings.language.replace('-', '_')];
    if (Settings.language === "en") thisProg = 100;
    if (!thisProg) thisProg = 0;
    $('#translation-progress').text(Language.get('menu.translate_progress').replace('{progress}', thisProg))
  }
};