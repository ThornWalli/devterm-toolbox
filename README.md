# devterm-toolbox

Electron App for printing with DevTerm thermal printer via `/tmp/DEVTERM_PRINTER_IN`.

## Usage

## Electron App usage on DevTerm

### TrayIcon not visible?

Install `xfce4-statusnotifier-plugin`.

```
sudo apt-get install xfce4-statusnotifier-plugin
```

### Generate Certificates for SSL Server

To control the DevTerm from [https://devterm.lammpee.de](https://devterm.lammpee.de). 
The DevTerm server must be operated as SSL for `https` usage.

Use this repository [generate-ip-cert](https://github.com/antelle/generate-ip-cert) to generate the appropriate credentials.  

## Development


> **Important:** On the DevTerm and further systems the appropriate libraries for `node-canvas` must be installed.  https://github.com/Automattic/node-canvas#compiling 


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
