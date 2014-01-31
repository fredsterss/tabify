var classes = require('classes')
  , Emitter = require('emitter')
  , events  = require('event');

/**
 * Expose Tabify
 */
module.exports = Tabify;

/**
 * Turn a linksEl and targetsEl
 * @param {el} parent el of links you want to be tabs
 * @param {el} parent el of targets for the tabs
 */
function Tabify (linksEl, targetsEl, options) {
  if (!(this instanceof Tabify)) return new Tabify(linksEl, targetsEl, options);
  options = options || {};
  this.hiddenClass = options.hiddenClass || "hidden";
  this.activeClass = options.activeClass || "active";
  this.current = 0;
  this.tabs = normalize(linksEl, targetsEl);
  this.showTab(0);
  this.bindAll();
};

/**
 * Mixin emitter
 */
Emitter(Tabify.prototype);

/**
 * Show target and activate link
 * @param  {Number} the tab order
 * @return {Tabify}
 */
Tabify.prototype.showTab = function (i) {
  this.hide();
  classes(this.tabs[i].link).add(this.activeClass);
  classes(this.tabs[i].target).remove(this.hiddenClass);
  this.current = i;
  return this;
}

/**
 * Show the next tab
 * @return {Tabify}
 */
Tabify.prototype.showNextTab = function () {
  if (this.current + 1 == this.tabs.length) {
    this.emit('finished');
    this.showTab(0);
  } else {
    this.showTab(this.current + 1);
  }
  return this;
}

/**
 * Hide tab. If no id is passed, hide all.
 * @param  {Number} tab order
 * @return {Tabify} 
 */
Tabify.prototype.hide = function (idArray) {
  // if idArray is set and not an array, transform to an array
  if (idArray != null && idArray instanceof Array == false) {
    idArray = [idArray];
  }
  for (i = 0; i < this.tabs.length; i++) {
    if (idArray != null && idArray.indexOf(i) === -1) {
      continue;
    }
    classes(this.tabs[i].link).remove(this.activeClass);
    classes(this.tabs[i].target).add(this.hiddenClass);
  }
  return this;
}

/**
 * Bind click events to all tabs
 * @return {Tabify}
 */
Tabify.prototype.bindAll = function () {
  for (i = 0; i < this.tabs.length; i++) {
    this.bind(i);
  }
  return this;
}

/**
 * Bind click events to a single tab
 * @param  {Object} tab
 * @return {Tabify}
 */
Tabify.prototype.bind = function (i) {
  var that = this;
  events.bind(this.tabs[i].link, 'click', function () {
    that.showTab(i);
  });
  return this;
}

/**
 * Given a links parent el and a targets parent el,
 * return an array of objects containing link and its
 * corresponding @$el.
 *
 * @param  {el} linksEl  
 * @param  {el} targetsEl
 * @return {Array} list of links and their targets
 */
function normalize (linksEl, targetsEl) {
  var links   = linksEl.querySelectorAll('li')
    , tabs    = []
    , targets = targetsEl.children;
  
  // iterate over links adding the link and the corresponding
  // target to the tabs array
  for (i = 0; i < links.length; i++) {
    if (targets[i] == undefined) continue;
    tabs.push({ link: links[i], target: targets[i] });
  }
  return tabs;
};