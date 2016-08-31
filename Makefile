index.js:
	rollup \
	-f cjs \
	-i src/Subject.js \
	-o index.js \
	-m index.js.map

node_modules:
	npm install

test: node_modules
	./node_modules/.bin/mocha --reporter spec

clean:
	rm -Rf node_modules

.PHONY: test
