# todomvc-react-ts

An exploration of using the following technologies together, using source code from http://blog.wolksoftware.com/working-with-react-and-typescript as a basis:

* TypeScript
* React
* SystemJS (and possibly JSPM)
* Webpack

## Quick Start

```
git clone https://github.com/lund0n/todomvc-react-ts.git
cd todomvc-react-ts
npm install
npm start
```

Open a browser to `http://localhost:3000` to see the built site. NOTE: livereload support is not added yet.

## TODO

- [ ] Add livereload support
- [ ] Address [FOUC](https://en.wikipedia.org/wiki/Flash_of_unstyled_content)
- [ ] Investigate loading third-party CSS using SystemJS, rather than Webpack
- [ ] Make switching between CDN resources and local resources part of the build config.

