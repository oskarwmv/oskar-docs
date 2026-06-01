import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Crabo Documentation',
  description: 'Documentation for Crabo Devs FiveM scripts.',
  base: '/oskar-docs/',
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'Crabo Documentation',
    search: {
      provider: 'local'
    },
    nav: [
      { text: 'Crabo Devs', link: '/' },
      { text: 'Resources', link: '/scripts/' },
      { text: 'Support', link: 'https://discord.gg/NcfpG9jDuq' }
    ],
    sidebar: [
      {
        text: 'Crabo Devs Documents',
        items: [
          { text: 'Crabo Documentation', link: '/' },
          { text: 'What is FiveM Escrow?', link: '/fivem-escrow' },
          { text: 'Open Source and Protected Core', link: '/protected-core' }
        ]
      },
      {
        text: 'CRABO RESOURCES',
        collapsed: false,
        items: [
          {
            text: 'oskar_battlepass',
            collapsed: false,
            items: [
              { text: 'Overview', link: '/scripts/oskar-battlepass/' },
              { text: 'Setup and Items', link: '/scripts/oskar-battlepass/setup-and-items' },
              { text: 'Configuration', link: '/scripts/oskar-battlepass/configuration' },
              { text: 'Framework Adapters', link: '/scripts/oskar-battlepass/framework-adapters' },
              { text: 'Rewards and Missions', link: '/scripts/oskar-battlepass/rewards-and-missions' },
              { text: 'Store and Boxes', link: '/scripts/oskar-battlepass/store-and-boxes' },
              { text: 'Integrations and API', link: '/scripts/oskar-battlepass/integrations-and-api' },
              { text: 'FAQ and Troubleshooting', link: '/scripts/oskar-battlepass/faq-and-troubleshooting' }
            ]
          }
        ]
      },
      {
        text: 'Support',
        items: [
          { text: 'Discord Server', link: '/support' }
        ]
      }
    ],
    outline: {
      level: [2, 3],
      label: 'On this page'
    },
    docFooter: {
      prev: 'Previous',
      next: 'Next'
    },
    footer: {
      message: 'Built for Crabo Devs FiveM scripts.',
      copyright: 'Copyright (c) 2026 Crabo Devs'
    }
  },
  head: [
    ['link', { rel: 'icon', href: '/logo.svg' }],
    ['meta', { name: 'theme-color', content: '#000000' }]
  ]
})
