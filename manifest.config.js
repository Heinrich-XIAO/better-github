import { defineManifest } from '@crxjs/vite-plugin'

export default defineManifest({
  manifest_version: 3,
  name: 'Better GitHub',
  version: '1.0.0',
  description: 'Adds a button to navigate to your fork of a repository',
  icons: {
    16: 'public/logo-16.png',
    32: 'public/logo-32.png',
    48: 'public/logo-48.png',
    128: 'public/logo-128.png',
  },
  permissions: ['storage'],
  host_permissions: ['https://github.com/*'],
  content_scripts: [
    {
      matches: ['https://github.com/*'],
      js: ['src/content/main.js'],
    },
  ],
  options_ui: {
    page: 'src/options/index.html',
    open_in_tab: false,
  },
})
