# devterm-toolbox

Electron App for printing with DevTerm thermal printer via `/tmp/DEVTERM_PRINTER_IN`.

## Usage

**Important:** On the DevTerm and further systems the appropriate libraries for `node-canvas` must be installed.

https://github.com/Automattic/node-canvas#compiling 


```bash
# install
npm i 

# electron app

# dev electron app
npm run dev:electron

# build electron app
npm run build:electron:win # uses windows as build target
npm run build:electron:mac # uses mac as build target
npm run build:electron:linux # uses linux as build target

# web

# dev web
npm run dev:web

# build web
npm run build:web

```

Optional configuration options can be found in the [Electron Builder CLI docs](https://www.electron.build/cli.html).
