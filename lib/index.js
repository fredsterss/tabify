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
  this.hiddenClass = options.hiddenClass || "hidden";
  this.activeClass = options.activeClass || "active";
  this.current = 0;
  this.tabs = this.getTabs(linksEl, targetsEl);
  this.showTab(0);
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
 * Show target and activate link
 * @param  {Number} the tab order
 * @return {Tabify}
 */
Tabify.prototype.showTab = function (i) {
  this.hideAll();
  classes(this.tabs[i].link).add(this.activeClass);
  classes(this.tabs[i].target).remove(this.hiddenClass);
  this.current = i;
  return this;
}

/**
 * Hide all
 * @return {Tabify}
 */
Tabify.prototype.hideAll = function () {
  for (i = 0; i < this.tabs.length; i++) {
    this.hideTab(i);
  }
  return this;
}

/**
 * Hide this target and deactivate link
 * @param  {Number} tab order
 * @return {Tabify} 
 */
Tabify.prototype.hideTab = function (i) {
  classes(this.tabs[i].link).remove(this.activeClass);
  classes(this.tabs[i].target).add(this.hiddenClass);
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