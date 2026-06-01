import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Oskar Documentation',
  description: 'Documentation for Oskar Devs FiveM scripts.',
  base: '/oskar-docs/',
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'Oskar Documentation',
    search: {
      provider: 'local'
    },
    nav: [
      { text: 'Oskar Devs', link: '/' },
      { text: 'Resources', link: '/scripts/' },
      { text: 'Support', link: 'https://discord.gg/NcfpG9jDuq' }
    ],
    sidebar: [
      {
        text: 'Oskar Devs Documents',
        items: [
          { text: 'Oskar Documentation', link: '/' },
          { text: 'What is FiveM Escrow?', link: '/fivem-escrow' },
          { text: 'Open Source and Protected Core', link: '/protected-core' }
        ]
      },
      {
        text: 'OSKAR RESOURCES',
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
          },
          { text: 'oskar_uber', link: '/scripts/oskar-uber/' }
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
    editLink: {
      pattern: 'https://github.com/oskarwmv/oskar-docs/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/oskarwmv/oskar-docs' }
    ],
    footer: {
      message: 'Built for Oskar Devs FiveM scripts.',
      copyright: 'Copyright © 2026 Oskar Devs'
    }
  },
  head: [
    ['link', { rel: 'icon', href: '/logo.svg' }],
    ['meta', { name: 'theme-color', content: '#0f172a' }]
  ]
})
