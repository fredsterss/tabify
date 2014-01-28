
build: components lib/index.js
	@echo building
	@component build --dev

components: component.json
	@component install --dev

clean:
	rm -fr build components

.PHONY: clean