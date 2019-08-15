# Laketown Fiber Calculator
[![Build Status](https://travis-ci.org/collectiveidea/laketown.svg?branch=master)](https://travis-ci.org/collectiveidea/laketown)

Laketown Township, Michigan is voting to build a state-of-the-art fiber optic network to every home. With it will come a small millage and cheap access to 100-120 Mbps broadband and inexpensive TV & Phone service too.

This calculator helps residents see how much they can save.

Originally published at [http://www.hollandfiber.org/laketown/](https://www.hollandfiber.org/laketown/)

![Demo of the calculator in action](./demo.gif?raw=true)

## Details

Everything is self-contained in [./index.html](index.html). If you want to drop it into another site, just take out the `<head>` and `<body>` tags (keeping the `<style>`).

## Running Tests

Install casperjs

```bash
npm install -g casperjs
```

Run the tests

```bash
casperjs test test/test.js
```
## License

© Copyright 2016–2019 Collective Idea.

<a rel="license" href="http://creativecommons.org/licenses/by/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International License</a>.
