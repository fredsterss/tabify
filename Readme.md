[Component](https://github.com/component/component) for turning a list into tabs.

## Installation

Install with [component(1)](http://component.io):

```
$ component install fredsterss/tabify
```

Your document must have a valid DOCTYPE otherwise IE doesn't support ``querySelectorAll``.

## API

### Tabify(linksEl, targetsEl)
Turns ``<li>`` children of ``linksEl`` into tabs, toggling visibility on the corresponding ``targetsEl``.