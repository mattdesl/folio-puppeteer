# folio-puppeteer

A test of FOLIO puppeteer rendering script.

## Install

```sh
npm install
```

If you get "Could not find expected browser" error, then:

```sh
cd node_modules/puppeteer
npm run install
cd ../../
```

## Usage

```sh
node src/index.js
```

Then see the PNG in `tmp/`. You can change the `height` and `maxTokens` variables in the `index.js` script.

## License

Copyright Matt DesLauriers.
The minified FOLIO code is not open source for the time being.
