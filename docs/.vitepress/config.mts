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
          { text: 'oskar_battlepass', link: '/scripts/oskar-battlepass/' },
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
