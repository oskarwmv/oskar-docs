import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Oskar Docs',
  description: 'Documentation hub for Oskar FiveM scripts.',
  base: '/oskar-docs/',
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'Oskar Docs',
    search: {
      provider: 'local'
    },
    nav: [
      { text: 'Scripts', link: '/scripts/' },
      { text: 'Battlepass', link: '/scripts/oskar-battlepass/' },
      { text: 'Support', link: 'https://discord.gg/NcfpG9jDuq' }
    ],
    sidebar: {
      '/scripts/oskar-battlepass/': [
        {
          text: 'oskar_battlepass',
          items: [
            { text: 'Overview', link: '/scripts/oskar-battlepass/' }
          ]
        }
      ],
      '/scripts/': [
        {
          text: 'Scripts',
          items: [
            { text: 'All Scripts', link: '/scripts/' },
            { text: 'oskar_battlepass', link: '/scripts/oskar-battlepass/' },
            { text: 'oskar_uber', link: '/scripts/oskar-uber/' }
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/' }
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
