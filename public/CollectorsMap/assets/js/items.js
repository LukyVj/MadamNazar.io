class BaseItem {
  constructor(preliminary) {
    Object.assign(this, preliminary);
    this.itemTranslationKey = `${this.itemId}.name`;
  }
  isWeekly() {
    // Don't use weekly when in preview mode.
    if (getParameterByName('q')) return false;
    //Check if weekly is valid to load markers on map
    if(!Weekly.current) return false;

    return Weekly.current.items.includes(this);
  }
  // requires Marker and Cycles to be loaded
  currentMarkers() {
    return this.markers.filter(marker => marker.isCurrent);
  }
  _insertWeeklyMenuElement($listParent) {
    this.$weeklyMenuButton = $(`
      <div class="weekly-item-listing" ${this.legacyItemId ? `data-type="${this.legacyItemId}"` : ""} data-help="${this.weeklyHelpKey}">
        <span>
          <div class="icon-wrapper"><img class="icon"
            src="./assets/images/icons/game/${this.itemId}.png" alt="Weekly item icon"></div>
          <span class="collectible" data-text="${this.itemTranslationKey}"></span>
        </span>
        <small class="counter-number counter-number-weekly">${this.amount}</small>
      </div>
    `).translate();
    this.$weeklyMenuButton[0].rdoItem = this;
    this.$weeklyMenuButton.appendTo($listParent);
    Loader.mapModelLoaded.then(() => {
      SettingProxy.addListener(InventorySettings, 'isEnabled stackSize', () =>
        this.$weeklyMenuButton
          .find('.counter-number')
          .toggle(InventorySettings.isEnabled)
          .toggleClass('text-danger', this.amount >= InventorySettings.stackSize)
          .end()
      )();
    });
  }
}

class NonCollectible extends BaseItem {
  constructor(preliminary) {
    super(preliminary);
    Object.defineProperty(this, 'amount', { configurable: false, enumerable: true, writable: false, value: '?' });
    this.markers = [];
    this.weeklyHelpKey = `weekly_${this.itemId}`;
  }
}

class Item extends BaseItem {
  constructor(preliminary) {
    super(preliminary);
    this.category = this.itemId.split('_', 1)[0];
    this.collection = Collection.collections.find(c => c.category === this.category);
    this.collection.items.push(this);
    this.legacyItemId = this.itemId.replace(/^flower_|^egg_/, '');
    this.weeklyHelpKey = 'weekly_item_collectable';
    this.markers = []; // filled by Marker.init();
    this._amountKey = `amount.${this.itemId}`;
    this._insertMenuElement();
  }
  // `.init()` needs DOM ready and jquery, but no other map realted scripts initialized
  static init() {
    this._installEventHandlers();
    this.items = [];
    return Loader.promises['items_value'].consumeJson(data => {
      Collection.init(data.collections);
      data.items.forEach(interimItem => this.items.push(new Item(interimItem)));
      return Weekly.init();
    });
  }
  static _installEventHandlers() {
    $('.side-menu')
      .on('contextmenu', event => {
        const item = $(event.target).propSearchUp('rdoItem');
        // clicked inside of the collectible, but outside of its counter part?
        if (item && !event.target.closest('.counter')) {
          event.preventDefault();
          event.stopImmediatePropagation();
          if (!['flower_agarita', 'flower_blood_flower'].includes(item.itemId)) {
            MapBase.highlightImportantItem(item.itemId, item.category);
          }
        }
      })[0].addEventListener('click', event => { // `.on()` can’t register to capture phase
        if (event.target.classList.contains('counter-button')) {
          event.stopImmediatePropagation();
          const $target = $(event.target);
          $target.closest('.collectible-wrapper')[0].rdoItem.changeAmountWithSideEffects($target.text() === '-' ? -1 : 1);
        } else if (event.target.classList.contains('open-submenu')) {
          event.stopPropagation();
          $(event.target)
            .toggleClass('rotate')
            .parent().parent().children('.menu-hidden')
            .toggleClass('opened');
        }
      }, { capture: true });
  }
  _insertMenuElement() {
    this.$menuButton = $(`
      <div class="collectible-wrapper" data-type="${this.legacyItemId}"
        data-help="${['flower_agarita', 'flower_blood_flower'].includes(this.itemId) ? 'item_night_only' : 'item'}">
        <img class="collectible-icon" src="assets/images/icons/game/${this.itemId}.png" alt="Set icon">
        <img class="collectible-icon random-spot" src="assets/images/icons/random_overlay.png" alt="Random set icon">
        <span class="collectible-text">
          <p class="collectible" data-text="${this.itemTranslationKey}"></p>
          <span class="counter">
            <div class="counter-button">-</div><!--
            --><div class="counter-number"></div><!--
            --><div class="counter-button">+</div>
          </span>
        </span>
      </div>
    `).translate();
    this.$menuButton[0].rdoItem = this;
    this.amount = this.amount; // trigger counter update
    this.$menuButton
      .appendTo(this.collection.$submenu)
    Loader.mapModelLoaded.then(() => {
      SettingProxy.addListener(InventorySettings, 'isEnabled', () =>
        this.$menuButton
          .find('.counter')
          .toggle(InventorySettings.isEnabled)
          .end()
      )();
    });
  }
  get amount() {
    return +localStorage.getItem(this._amountKey);
  }
  set amount(value) {
    if (value < 0) value = 0;
    if (value) {
      localStorage.setItem(this._amountKey, value);
    } else {
      localStorage.removeItem(this._amountKey);
    }
    this.$menuButton.add(this.$weeklyMenuButton)
      .find('.counter-number')
      .text(value)
      .toggleClass('text-danger', value >= InventorySettings.stackSize);
    this.markers.forEach(m => m.updateOpacity());
  }
  // use the following marker based property only after Marker.init()!
  effectiveAmount() {
    if (InventorySettings.isEnabled) {
      return this.amount;
    } else {
      return this.markers.filter(marker => marker.isCurrent && marker.isCollected).length;
    }
  }
  updateMenu() {
    const currentMarkers = this.currentMarkers();
    const buggy = currentMarkers.every(marker => marker.buggy);
    this.$menuButton
      .attr('data-help', () => {
        if (buggy) {
          return 'item_unavailable';
        } else if (['flower_agarita', 'flower_blood_flower'].includes(this.itemId)) {
          return 'item_night_only';
        } else if (this.isWeekly()) {
          return 'item_weekly';
        } else {
          return 'item';
        }
      })
      .toggleClass('weekly-item', this.isWeekly())
      .find('.collectible-text p')
      .toggleClass('disabled', currentMarkers.every(marker => !marker.canCollect))
      .end()
      .find('.counter')
      .toggle(InventorySettings.isEnabled)
      .end()
      .find('.collectible-icon.random-spot')
      .toggle(buggy)
      .end()
      .find('.counter-number')
      .toggleClass('not-found', buggy)
      .end();

    return buggy;
  }
  changeAmountWithSideEffects(changeAmount) {
    this.amount += changeAmount;

    if (InventorySettings.isEnabled) {
      this.markers.forEach(marker => {
        const popup = marker.lMarker && marker.lMarker.getPopup();
        popup && popup.isOpen() && popup.update();

        if (marker.isCurrent) {
          $(`[data-type=${marker.legacyItemId}] .collectible-text p`).toggleClass('disabled',
            this.markers.filter(m => m.cycleName === marker.cycleName).every(m => !m.canCollect));
        }
      });
    }

    Inventory.updateItemHighlights();
    Menu.refreshItemsCounter();
  }
}