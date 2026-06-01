# oskar_battlepass

Complete Battle Pass system for FiveM servers with progression, normal rewards, premium rewards, legal-only catalog options, diamond shop, loot boxes, profile image integration, and an open framework adapter layer.

::: info
This script is prepared for vRP, ESX, QBCore, and QBox based servers. The adaptation files stay open so server owners can integrate the resource without editing the protected client/server core.
:::

```lua
author 'Crabo'
lua54 'yes'
ui_page 'web/build/index.html'
```

```lua
server_scripts {
  'frameworks/vrp.lua',
  'frameworks/esx.lua',
  'frameworks/qbcore.lua',
  'frameworks/qbox.lua',
  'functions/store.lua',
  'functions/server.lua',
  'server/token.lua',
  'server/server.lua'
}
```

## Overview

`oskar_battlepass` is a season-style progression resource. Players earn XP through configured missions, unlock one level per 100 XP, claim normal rewards, and unlock premium rewards when they have the configured premium group.

The active catalog is designed for legal rewards only:

- 30 normal rewards.
- 30 premium rewards.
- 80 missions.
- 30 levels.
- 100 XP per level.
- 3000 total mission XP.
- Premium access and XP boost by group.
- Repeatable diamond shop purchases.
- 6 loot boxes with legal rewards.
- Profile image from config or `lb-phone` Instapic.

## Start Here

<div class="resource-list">
  <a class="resource-row" href="/oskar-docs/scripts/oskar-battlepass/setup-and-items">
    <span>
      <strong>Setup and Items</strong>
      <small>Dependencies, server.cfg order, database behavior, required items, and install checklist.</small>
    </span>
    <span class="resource-arrow">></span>
  </a>
  <a class="resource-row" href="/oskar-docs/scripts/oskar-battlepass/configuration">
    <span>
      <strong>Configuration</strong>
      <small>Framework selector, UI options, premium group, XP settings, profile images, store, boxes, and catalog settings.</small>
    </span>
    <span class="resource-arrow">></span>
  </a>
  <a class="resource-row" href="/oskar-docs/scripts/oskar-battlepass/framework-adapters">
    <span>
      <strong>Framework Adapters</strong>
      <small>How vRP, ESX, QBCore, and QBox are supported through open adapter files.</small>
    </span>
    <span class="resource-arrow">></span>
  </a>
  <a class="resource-row" href="/oskar-docs/scripts/oskar-battlepass/integrations-and-api">
    <span>
      <strong>Integrations and API</strong>
      <small>Public events, task XP triggers, callbacks, profile image hooks, and open BP/BPClient APIs.</small>
    </span>
    <span class="resource-arrow">></span>
  </a>
</div>

## Important Notes

- Main config file: `config/config.lua`.
- Open integration files: `functions/` and `frameworks/`.
- Protected core candidates: `client/client.lua`, `server/server.lua`, and `server/token.lua`.
- Default command: `/passe`.
- Default framework in the current base: `vrp`.
- Default diamond item: `diamante`.
- Active catalog version: `legal_30_rewards_80_missions_v1`.
- Premium group: `PassePremium`.
- Premium XP multiplier: `2.0`.
- Store purchases do not lock after buying; players can buy the same item multiple times.
- Store quantity starts at `1`; the selected quantity is the delivered amount unless legacy pack mode is enabled.
- Boxes are consumed from the internal Battle Pass box inventory when opened.
- Box rewards should be delivered when the countdown finishes, not only when the close button is pressed.

## Product Structure

```text
oskar_battlepass/
  config/
    config.lua
  functions/
    shared.lua
    client.lua
    server.lua
    store.lua
  frameworks/
    vrp.lua
    esx.lua
    qbcore.lua
    qbox.lua
  client/
    client.lua
    utils.lua
  server/
    server.lua
    server_functions.lua
    token.lua
  web/
    build/
```

## Support

Support: [discord.gg/NcfpG9jDuq](https://discord.gg/NcfpG9jDuq)
