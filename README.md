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

1. Generate Certificate for your network ip (e.g. `192.168.1.10`).
2. Renaming generate files:
  - e.g. `cert.pem` -> `devterm_192.168.1.10.crt`
  - e.g. `key.pem` -> `devterm_192.168.1.10.key`
3. Install Certificate
   1. Copy `crt` file (e.g. `devterm_192.168.1.10.crt`)  
      `sudo cp 192.168.1.10.cert /usr/share/ca-certificates/`
   2. Set permissions:   
      `sudo chown 644 /usr/share/ca-certificates/devterm_192.168.1.14.crt`
   3. Execute `sudo update-ca-certificates` or `sudo dpkg-reconfigure ca-certificates`.
4. Register the Certificate on other network clients. 


### Android 12

Create a `p12` file.

openssl pkcs12 -export -in devterm_192.168.1.14.crt -inkey devterm_192.168.1.14.key -out devterm_192.168.1.14.p12


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
