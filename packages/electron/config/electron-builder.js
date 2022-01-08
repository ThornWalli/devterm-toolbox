module.exports = {
  // appId: 'com.electron.devterm-toolbox',
  directories: {
    output: 'dist'
  },
  nsis: {
    oneClick: false,
    perMachine: false,
    allowToChangeInstallationDirectory: true,
    shortcutName: 'DevTerm-ToolBox'
  },
  mac: {
    icon: 'build/icons/mac/icon.icns'
  },
  linux: {
    icon: 'build/icons/png/512x512.png',
    target: [
      'snap'
    ]
  },
  files: [
    '!**/node_modules/*/{CHANGELOG.md,README.md,README,readme.md,readme}',
    '!**/node_modules/*/{test,__tests__,tests,powered-test,example,examples}',
    '!**/node_modules/*.d.ts',
    '!**/node_modules/.bin',
    '!src/renderer',
    '!config',
    '!README.md',
    '!scripts',
    '!build',
    '!dist',
    {
      from: 'build/renderer',
      to: 'renderer',
      filter: [
        '**/*'
      ]
    }
  ]
};
