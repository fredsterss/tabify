var Emitter = require('emitter')
  , classes = require('classes')
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
  this.hiddenClass = options.hiddenClass || "hidden"
  this.activeClass = options.activeClass || "active"

  this.tabs = this.getTabs(linksEl, targetsEl);
  this.show(this.tabs[0]);
  this.bindAll();
};

/**
 * Mixin emitter
 */
Emitter(Tabify.prototype);

/**
 * Given a links parent el and a targets parent el,
 * return an array of objects containing link and its
 * corresponding @$el.
 *
 * @param  {el} linksEl  
 * @param  {el} targetsEl
 * @return {Array} list of links and their targets
 */
Tabify.prototype.getTabs = function (linksEl, targetsEl) {
  var links = linksEl.querySelectorAll('li');
  var targets = targetsEl.children;
  
  // iterate over links adding the link and the corresponding
  // target to the tabs array
  var tabs = [];
  for (i = 0; i < links.length; i++) {
    if (targets[i] == undefined) continue;
    tabs.push({ link: links[i], target: targets[i] });
  }
  return tabs;
};

/**
 * Hide all
 * @return {Tabify}
 */
Tabify.prototype.hideAll = function () {
  for (i = 0; i < this.tabs.length; i++) {
    this.hide(this.tabs[i]);
  }
  return this;
}

/**
 * Hide this target and deactivate link
 * @param  {Object} tab (link + target)
 * @return {Tabify} 
 */
Tabify.prototype.hide = function (tab) {
  classes(tab.link).remove(this.activeClass);
  classes(tab.target).add(this.hiddenClass);
  return this;
}

/**
 * Show target and activate link
 * @param  {Object} tab
 * @return {Tabify}
 */
Tabify.prototype.show = function (tab) {
  this.hideAll();
  classes(tab.link).add(this.activeClass);
  classes(tab.target).remove(this.hiddenClass);
  return this;
}

/**
 * Bind click events to all tabs
 * @return {Tabify}
 */
Tabify.prototype.bindAll = function () {
  for (i = 0; i < this.tabs.length; i++) {
    this.bind(this.tabs[i]);
  }
  return this;
}

/**
 * Bind click events to a single tab
 * @param  {Object} tab
 * @return {Tabify}
 */
Tabify.prototype.bind = function (tab) {
  var that = this;
  events.bind(tab.link, 'click', function () {
    that.show(tab);
  });
  return this;
}