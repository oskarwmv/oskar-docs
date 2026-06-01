# oskar_battlepass

A complete Battle Pass system for FiveM servers with a React NUI, progression, rewards, premium rewards, store purchases, loot boxes, an internal Battle Pass box inventory, and an open framework adapter layer.

Developed by **Oskar.wmv**  
Support: `discord.gg/NcfpG9jDuq`

---

## Table Of Contents

1. [Overview](#overview)
2. [New Adapter Architecture](#new-adapter-architecture)
3. [Supported Frameworks](#supported-frameworks)
4. [File Structure](#file-structure)
5. [Editable Files](#editable-files)
6. [Protected Core Files](#protected-core-files)
7. [Installation](#installation)
8. [Framework Selector](#framework-selector)
9. [Framework Settings](#framework-settings)
10. [Open Server API](#open-server-api)
11. [Open Client API](#open-client-api)
12. [Database](#database)
13. [Battle Pass Configuration](#battle-pass-configuration)
14. [Public Events](#public-events)
15. [Adapting To Another Server Base](#adapting-to-another-server-base)
16. [NUI](#nui)
17. [Troubleshooting](#troubleshooting)
18. [Release Checklist](#release-checklist)

---

## Overview

`oskar_battlepass` is built for FiveM servers that need a complete Battle Pass experience:

- Level-based Battle Pass progression.
- Normal and premium rewards.
- Diamond-based store.
- Loot boxes purchasable with diamonds or cash.
- Internal Battle Pass box inventory.
- Box rewards selected by configurable probability.
- XP from tasks.
- XP from online time.
- Optional profile image integration with `lb-phone`.
- React/TypeScript interface already built in `web/build`.
- Open adaptation layer for vRP, ESX, QBCore, and QBox.

---

## New Adapter Architecture

The script was reorganized so server owners can adapt it without editing the critical core.

Previously, the Lua code was tied directly to vRP:

- Fixed `@vrp/lib/utils.lua` dependency in `fxmanifest.lua`.
- Direct `Tunnel` and `Proxy` usage in client/server files.
- Direct calls such as `vRP.getUserId`, `vRP.getUData`, and `vRP.tryPayment`.
- Vehicle inserts tied to `vrp_user_vehicles`.

The new architecture separates framework logic from protected logic:

- The active framework is selected in `config/config.lua`.
- All framework-specific logic is open in `frameworks/`.
- All general integration helpers are open in `functions/`.
- The core uses only the public `BP` and `BPClient` APIs.
- `client/client.lua` and `server/server.lua` are prepared for protection, obfuscation, and authentication.
- The protected core does not call `vRP`, `ESX`, `QBCore`, `qbx_core`, `Tunnel`, or `Proxy` directly.

---

## Supported Frameworks

| Framework | Adapter File | Status |
| --- | --- | --- |
| vRP | `frameworks/vrp.lua` | Default adapter for the current base |
| ESX | `frameworks/esx.lua` | Ready for ESX Legacy-style bases |
| QBCore | `frameworks/qbcore.lua` | Ready for QBCore bases |
| QBox | `frameworks/qbox.lua` | Ready for QBox/qbx_core bases |

Default setting:

```lua
framework = 'vrp'
```

---

## File Structure

```text
oskar_battlepass/
  fxmanifest.lua
  README.md

  config/
    config.lua

  functions/
    shared.lua
    client.lua
    server.lua

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

### Main Directories

`config/`  
General Battle Pass configuration: framework selector, commands, colors, images, rewards, tasks, store, boxes, premium settings, translations, and integration options.

`functions/`  
Open integration layer used by the protected core. This is where generic server/client behavior can be adjusted without touching the core.

`frameworks/`  
Framework-specific adapters. Each adapter translates Battle Pass API calls into the selected framework.

`client/`  
Client-side core. Prepared for protection and obfuscation. Framework adaptation should not be added here.

`server/`  
Server-side core, token file, and compatibility stubs. Prepared for protection and obfuscation.

`web/build/`  
Compiled NUI assets.

---

## Editable Files

These files are intentionally open and should remain editable by customers:

```text
config/config.lua
functions/shared.lua
functions/client.lua
functions/server.lua
frameworks/vrp.lua
frameworks/esx.lua
frameworks/qbcore.lua
frameworks/qbox.lua
```

Use these files to adapt:

- Player ID lookup.
- Player name and identity.
- Permissions.
- Groups, jobs, and roles.
- Cash and bank money.
- Inventory.
- Inventory weight and carry checks.
- Item names, labels, weight, and metadata.
- Vehicle delivery.
- Player data storage.
- SQL wrappers.
- Notifications.
- Profile image providers.
- Phone integrations.
- Custom inventory systems.
- Custom garage systems.

---

## Protected Core Files

These files are prepared to be closed, obfuscated, and protected with authentication:

```text
client/client.lua
server/server.lua
server/token.lua
```

They should only call:

- `BP.*` on the server side.
- `BPClient.*` on the client side.
- Public Battle Pass events.

Do not add framework-specific code to these files.

### Compatibility Stubs

These older files are kept only as compatibility pointers:

```text
client/utils.lua
server/server_functions.lua
```

The real editable logic was moved to:

```text
functions/client.lua
functions/server.lua
```

---

## Installation

### 1. Place The Resource In Your Server

Example:

```text
server-data/resources/[oskar]/oskar_battlepass
```

### 2. Start The Framework Before The Battle Pass

For vRP:

```cfg
ensure vrp
ensure oskar_battlepass
```

For ESX:

```cfg
ensure oxmysql
ensure es_extended
ensure oskar_battlepass
```

For QBCore:

```cfg
ensure oxmysql
ensure qb-core
ensure oskar_battlepass
```

For QBox:

```cfg
ensure oxmysql
ensure qbx_core
ensure ox_inventory
ensure oskar_battlepass
```

### 3. Select The Framework

Open:

```text
config/config.lua
```

Set:

```lua
framework = 'vrp'
```

Allowed values:

```lua
'vrp'
'esx'
'qbcore'
'qbox'
```

### 4. Restart The Resource

In the server console:

```cfg
restart oskar_battlepass
```

### 5. Open In Game

Default command:

```text
/passe
```

You can change it in:

```lua
command = 'passe'
```

---

## Framework Selector

The selector is located near the top of `config/config.lua`:

```lua
framework = 'vrp',
```

Examples:

```lua
framework = 'esx',
```

```lua
framework = 'qbcore',
```

```lua
framework = 'qbox',
```

`fxmanifest.lua` loads all adapter files:

```lua
server_scripts {
  "frameworks/vrp.lua",
  "frameworks/esx.lua",
  "frameworks/qbcore.lua",
  "frameworks/qbox.lua",
  "functions/server.lua",
  "server/token.lua",
  "server/server.lua"
}
```

Only the adapter selected through `config.framework` is used at runtime.

---

## Framework Settings

`config/config.lua` contains a framework settings block:

```lua
frameworkSettings = {
  vrp = {
    resource = 'vrp',
    vehicleTable = 'vrp_user_vehicles',
    vehicleUserColumn = 'user_id',
    vehicleColumn = 'vehicle',
    vehicleIpvaColumn = 'ipva',
  },
  esx = {
    resource = 'es_extended',
    useOxInventory = false,
    moneyAccount = 'money',
    vehicleTable = 'owned_vehicles',
    vehicleOwnerColumn = 'owner',
    vehiclePlateColumn = 'plate',
    vehicleDataColumn = 'vehicle',
    vehicleTypeColumn = 'type',
  },
  qbcore = {
    resource = 'qb-core',
    useOxInventory = false,
    moneyAccount = 'cash',
    vehicleTable = 'player_vehicles',
    vehicleLicenseColumn = 'license',
    vehicleCitizenColumn = 'citizenid',
    vehicleModelColumn = 'vehicle',
    vehicleHashColumn = 'hash',
    vehicleModsColumn = 'mods',
    vehiclePlateColumn = 'plate',
    vehicleStateColumn = 'state',
  },
  qbox = {
    resource = 'qbx_core',
    useOxInventory = true,
    moneyAccount = 'cash',
    vehicleTable = 'player_vehicles',
    vehicleLicenseColumn = 'license',
    vehicleCitizenColumn = 'citizenid',
    vehicleModelColumn = 'vehicle',
    vehicleHashColumn = 'hash',
    vehicleModsColumn = 'mods',
    vehiclePlateColumn = 'plate',
    vehicleStateColumn = 'state',
  },
}
```

### vRP

Adapter:

```text
frameworks/vrp.lua
```

Uses:

- `vRP.getUserId`
- `vRP.getUserIdentity`
- `vRP.getUData`
- `vRP.setUData`
- `vRP.tryPayment`
- `vRP.giveInventoryItem`
- `vRP.tryGetInventoryItem`
- `vrp_user_vehicles`

### ESX

Adapter:

```text
frameworks/esx.lua
```

Uses:

- `exports['es_extended']:getSharedObject()`
- `ESX.GetPlayerFromId`
- `xPlayer.identifier`
- `xPlayer.getMoney`
- `xPlayer.removeMoney`
- `xPlayer.addInventoryItem`
- `oxmysql`

Persistent Battle Pass data can be stored in:

```text
oskar_battlepass_data
```

### QBCore

Adapter:

```text
frameworks/qbcore.lua
```

Uses:

- `exports['qb-core']:GetCoreObject()`
- `QBCore.Functions.GetPlayer`
- `Player.PlayerData.citizenid`
- `Player.Functions.GetMoney`
- `Player.Functions.RemoveMoney`
- `Player.Functions.AddItem`
- metadata key `oskar_battlepass`
- `oxmysql`

### QBox

Adapter:

```text
frameworks/qbox.lua
```

Uses:

- `exports.qbx_core`
- `GetPlayer`
- `GetMoney`
- `RemoveMoney`
- `GetMetadata`
- `SetMetadata`
- `ox_inventory` when `useOxInventory = true`
- `oxmysql`

---

## Open Server API

The server core uses the public `BP` API.

Main functions:

```lua
BP.GetPlayerId(source)
BP.GetPlayerSource(playerId)
BP.GetPlayerName(sourceOrPlayerId)
BP.GetPlayerRegister(source)
BP.GetUserGroups(source)
BP.HasPermission(playerId, permission)

BP.GetMoney(playerId, account)
BP.TryPayment(playerId, amount, account)

BP.GiveItem(source, item, amount, metadata)
BP.TryRemoveItem(playerId, item, amount)
BP.CanCarryItem(source, item, amount)

BP.GiveVehicle(playerId, vehicle, metadata)

BP.GetItemName(item)
BP.GetItemWeight(item)
BP.GetItemType(item)
BP.GetInventoryItems(source)

BP.GetData(playerId, key)
BP.SetData(playerId, key, value)

BP.Prepare(name, sql)
BP.Query(name, params)
BP.Execute(name, params)

BP.Notify(source, type, message)
```

### Server Callbacks

The protected server core registers these callbacks:

```lua
BP.RegisterCallback('userData', ...)
BP.RegisterCallback('claimReward', ...)
BP.RegisterCallback('buyItem', ...)
BP.RegisterCallback('buyBox', ...)
BP.RegisterCallback('giveItem', ...)
```

The client calls them through `BPClient.Callback`.

---

## Open Client API

File:

```text
functions/client.lua
```

Main functions:

```lua
BPClient.SendReactMessage(action, data)
BPClient.DebugPrint(...)
BPClient.OnInterfaceDisplayed()
BPClient.OnInterfaceHidden()
BPClient.GetProfileImage()
BPClient.Callback(name, payload, timeout)
```

### Profile Image

Configuration:

```lua
playerProfile = {
  source = 'config',
  useLbPhoneInstapic = true,
  phoneFramework = 'lb-phone',
  defaultImage = 'images/jimmy_pic.webp',
  lbPhone = {
    resource = 'lb-phone',
    ownerIdSource = 'license',
    identifierType = 'license',
    databaseQuery = 'getLbPhoneInstapicProfileImage',
    useDatabase = true,
    tables = {
      phones = 'phone_phones',
      instagramAccounts = 'phone_instagram_accounts',
    },
    columns = {
      ownerId = 'id',
      phoneNumber = 'phone_number',
      profileImage = 'profile_image',
      assigned = 'assigned',
    },
  }
}
```

With this default setup, all players use `defaultImage` unless an Instagram/Instapic profile image exists in `lb-phone`. The database lookup uses the FiveM license from:

```lua
GetPlayerIdentifierByType(source, 'license')
```

It then joins `phone_phones.id` to the player license and `phone_instagram_accounts.phone_number` to the phone number, returning `phone_instagram_accounts.profile_image`. If no valid image exists, `defaultImage` is used.

---

## Database

The script creates or uses these tables:

```text
oskar_tasks
oskar_tasks_user
oskar_rewards
oskar_rewards_user
oskar_store
oskar_store_user
oskar_battlepass_data
```

### Generic Data Table

For frameworks that do not use `vRP.getUData/setUData`, the open layer can use:

```sql
CREATE TABLE IF NOT EXISTS `oskar_battlepass_data` (
  `user_id` VARCHAR(64) NOT NULL,
  `dkey` VARCHAR(100) NOT NULL,
  `dvalue` LONGTEXT NULL,
  PRIMARY KEY (`user_id`, `dkey`) USING BTREE
);
```

It can store:

- `battlepass_diamonds`
- `battlepass_boxes`
- `itsPremium`
- `playerLevel`
- `profileName`

### vRP

The vRP adapter uses `getUData/setUData` when available.

### ESX

The ESX adapter uses `oxmysql` and can use `oskar_battlepass_data`.

### QBCore And QBox

QBCore and QBox try to use metadata key `oskar_battlepass` while the player is online. If your base requires SQL-only storage, adjust the selected adapter to always use `oskar_battlepass_data`.

---

## Battle Pass Configuration

All configuration is in:

```text
config/config.lua
```

Important settings:

```lua
logo = 'LOGO_URL'
command = 'passe'
paymentEvent = 'oskar_battlepass:jobPayment'
diamondItemName = 'diamante'
buyBoxWith = 'diamante'
```

### Online Time XP

```lua
giveXpByTimeOnline = {
  frequence = 60,
  amount = 10
}
```

### Colors

```lua
defaultColors = {
  primaryColor = 'rgb(96, 65, 180)',
  rawPrimaryColor = '96, 65, 180'
}
```

### Background Images

```lua
backgroundImageBattlepass = 'images/box.jpeg'
backgroundImageStore = 'images/box.jpeg'
backgroundImageBoxes = 'images/box.jpeg'
```

### Banners

```lua
bannerBattlepass = 'images/banner_battlepass.png'
bannerStore = 'images/banner_battlepass.png'
bannerBoxes = 'images/banner_battlepass.png'
bannerInventory = 'images/banner_battlepass.png'
```

### Diamond Store Purchases

The store is a repeatable diamond shop. Buying an item does not mark it as purchased, does not lock the card, and does not update `store_status` to `already purchased`.

The quantity selector starts at `1`. By default, item rewards deliver exactly the selected quantity, regardless of the configured `itemAmount` in the store entry. For example, a vodka entry with `itemAmount = 10` still delivers `1` vodka when the player buys quantity `1`.

The server resolves the real item, price, promotion flag, and reward key from `config.store` using the received `item_id`; the NUI payload is not trusted as the source of truth for purchase values.

```lua
storePurchase = {
  useItemAmountAsBase = false,
  minQuantity = 1,
  maxQuantity = 99,
  vehicleQuantity = 1,
}
```

Set `useItemAmountAsBase = true` only if you want legacy pack behavior:

```text
final amount = itemAmount * selected quantity
```

The open quantity and price helpers are in:

```text
functions/store.lua
```

---

## Public Events

### Open Battle Pass

Command:

```text
/passe
```

### Open Store From Another Script

```lua
TriggerEvent('oskar_battlepass:openShop')
```

### Task Progress

Configurable event:

```lua
paymentEvent = 'oskar_battlepass:jobPayment'
```

Usage:

```lua
TriggerEvent('oskar_battlepass:jobPayment', amount, jobName, source)
```

Example:

```lua
TriggerEvent('oskar_battlepass:jobPayment', 1, 'mineradora1', source)
```

### Give Premium

```lua
TriggerEvent('oskar_battlepass:becomePremium', user_id, 'admin')
```

### Update Profile Name/Image

```lua
TriggerEvent('oskar_groups:profileNamePlayer', user_id, profileName)
```

---

## Adapting To Another Server Base

### Main Rule

Do not edit:

```text
client/client.lua
server/server.lua
```

Edit:

```text
config/config.lua
functions/
frameworks/
```

### Step 1: Choose The Framework

```lua
framework = 'qbcore'
```

### Step 2: Adjust Resource Names

If your base uses a custom resource name:

```lua
qbcore = {
  resource = 'qb-core'
}
```

or:

```lua
qbox = {
  resource = 'qbx_core'
}
```

### Step 3: Adjust Money Account

Examples:

```lua
moneyAccount = 'cash'
```

```lua
moneyAccount = 'bank'
```

### Step 4: Adjust Inventory

For `ox_inventory`:

```lua
useOxInventory = true
```

For the framework's native inventory:

```lua
useOxInventory = false
```

### Step 5: Adjust Vehicle Delivery

If your vehicle table uses different columns, edit the matching framework block:

```lua
vehicleTable = 'player_vehicles'
vehicleCitizenColumn = 'citizenid'
vehicleModelColumn = 'vehicle'
vehiclePlateColumn = 'plate'
```

For custom garage logic, edit the selected adapter:

```text
frameworks/qbcore.lua
```

Function:

```lua
adapter.GiveVehicle(playerId, vehicle, metadata)
```

### Step 6: Adjust Permissions

Edit the selected adapter:

```lua
adapter.HasPermission(playerId, permission)
```

### Step 7: Adjust Notifications

Edit:

```lua
adapter.Notify(source, notifType, message)
```

Default behavior:

```lua
TriggerClientEvent('battlepass:notify', source, notifType, message)
```

---

## NUI

NUI page:

```lua
ui_page "web/build/index.html"
```

Files sent to FiveM:

```lua
files {
  "web/build/index.html",
  "web/build/**/*"
}
```

The client sends data to the NUI with:

```lua
SendReactMessage('setUserData', data)
```

The NUI calls callbacks such as:

```lua
claimReward
buyItem
buyBox
giveItem
hideFrame
getClientData
```

---

## Troubleshooting

### The Battle Pass Does Not Open

Check:

- Is the resource started?
- Is `config.framework` correct?
- Does the framework start before the Battle Pass?
- Is `config.command` correct?
- Does the console show an adapter error?

### Framework Resource Not Found

Example:

```text
[oskar-battlepass] QBCore resource not found
```

Fix the configured resource name:

```lua
frameworkSettings.qbcore.resource = 'your-qb-core-name'
```

### oxmysql Error

ESX, QBCore, and QBox adapters use `oxmysql` by default.

Make sure your `server.cfg` starts:

```cfg
ensure oxmysql
```

before:

```cfg
ensure oskar_battlepass
```

### Items Are Not Delivered

Check:

- Does the item exist in your framework?
- Is the correct adapter selected?
- Is `useOxInventory` correct?
- Does `adapter.GiveItem` return `true`?
- Can the player carry the item?

### Vehicles Are Not Delivered

Check:

- `vehicleTable`.
- Column names in the selected framework settings.
- Whether your vehicle table requires extra fields.
- `adapter.GiveVehicle`.

### Money Is Not Removed

Check:

```lua
moneyAccount = 'cash'
```

or:

```lua
moneyAccount = 'money'
```

depending on your framework.

### Core Is Calling Framework Code Directly

The protected core should not contain direct calls like:

```lua
vRP.
ESX.
QBCore.
qbx_core
Tunnel
Proxy
```

Those calls should exist only in:

```text
frameworks/
```

---

## Release Checklist

Before selling or sending the script:

- [ ] `config.framework` is correct.
- [ ] The framework starts before `oskar_battlepass`.
- [ ] `functions/` remains open.
- [ ] `frameworks/` remains open.
- [ ] `client/client.lua` is protected or obfuscated.
- [ ] `server/server.lua` is protected or obfuscated.
- [ ] `server/token.lua` is protected or included in the authentication layer.
- [ ] Customers do not need to edit core files.
- [ ] Store item purchase works.
- [ ] Store vehicle purchase works.
- [ ] Box purchase with cash works.
- [ ] Box purchase with diamonds works.
- [ ] Box item delivery works.
- [ ] Box vehicle delivery works.
- [ ] Normal reward claiming works.
- [ ] Premium reward claiming works.
- [ ] Task XP works.
- [ ] Online time XP works.
- [ ] Player data persists after reconnect.

---

## Developer Notes

This architecture is designed so any server owner can adapt the script to vRP, ESX, QBCore, or QBox by editing only open files.

If a server has a custom inventory, garage, identity system, permission system, or money system, the correct place to adapt it is the selected file in `frameworks/`, not the protected core.
