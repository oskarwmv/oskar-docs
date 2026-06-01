# Configuration

The main configuration file is:

```text
config/config.lua
```

This page explains the most important blocks and how server owners should edit them.

## Framework Selector

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

Only the selected adapter is used at runtime, even though all adapter files are loaded by `fxmanifest.lua`.

## Framework Settings

Each framework has its own settings block:

```lua
frameworkSettings = {
  vrp = {
    resource = 'vrp',
    vehicleTable = 'vrp_user_vehicles',
  },
  esx = {
    resource = 'es_extended',
    useOxInventory = false,
    moneyAccount = 'money',
  },
  qbcore = {
    resource = 'qb-core',
    useOxInventory = false,
    moneyAccount = 'cash',
  },
  qbox = {
    resource = 'qbx_core',
    useOxInventory = true,
    moneyAccount = 'cash',
  },
}
```

If your base renamed a framework resource, change the `resource` value. If your inventory is custom, adjust the matching adapter file in `frameworks/`.

## Command and Events

```lua
command = 'passe'
paymentEvent = 'oskar_battlepass:jobPayment'
diamondItemName = 'diamante'
progressBarEvent = 'progress'
```

| Option | Purpose |
| --- | --- |
| `command` | In-game command used to open the Battle Pass |
| `paymentEvent` | Event used by external jobs to progress missions |
| `diamondItemName` | Item removed when buying store items or boxes with diamonds |
| `progressBarEvent` | Progress bar event used by the UI flow |

## Leveling

The active catalog uses:

```lua
leveling = {
  xpPerLevel = 100,
  maxLevel = 30,
}
```

That means:

```text
30 levels * 100 XP = 3000 XP required
```

The current mission catalog is balanced to provide 3000 total mission XP.

## Online Time XP

```lua
giveXpByTimeOnline = {
  frequence = 60,
  amount = 10
}
```

This gives passive XP to online players. Tune this carefully because it can let players progress without doing missions.

## Premium Access

Premium is group-based only:

```lua
premiumAccess = {
  group = 'PassePremium',
  permissions = {
    'battlepass.premium',
    'battlepass.xpboost',
  },
  xpMultiplier = 2.0,
}
```

If the player has the configured group, they can claim premium rewards and receive the XP boost multiplier. Premium status is not stored as a database purchase.

## Profile Image

Default behavior:

```lua
playerProfile = {
  source = 'config',
  defaultImage = 'images/jimmy_pic.webp',
  useLbPhoneInstapic = true,
  phoneFramework = 'lb-phone',
}
```

If `useLbPhoneInstapic = true`, the script tries to read the player profile image from `lb-phone` Instapic/Instagram. If no image exists, the configured default image is used for everyone.

The lookup is designed around:

```text
phone_phones.id = player license
phone_instagram_accounts.phone_number = phone_phones.phone_number
phone_instagram_accounts.profile_image = profile image URL
```

## UI Branding

```lua
logo = 'LOGO_URL'
font = 'AmpleSoftPro'
defaultColors = {
  primaryColor = 'rgb(96, 65, 180)',
  rawPrimaryColor = '96, 65, 180'
}
```

All highlighted UI colors should follow the configured primary color. If you see old yellow hover states, update the component style to use `rawPrimaryColor` or `primaryColor`.

## Images and Banners

```lua
backgroundImageBattlepass = 'images/box.jpeg'
backgroundImageStore = 'images/box.jpeg'
backgroundImageBoxes = 'images/box.jpeg'

bannerBattlepass = 'images/banner_battlepass.png'
bannerStore = 'images/banner_battlepass.png'
bannerBoxes = 'images/banner_battlepass.png'
bannerInventory = 'images/banner_battlepass.png'
```

Keep images inside the NUI build or use URLs that are reachable by the client.

## Active Legal Catalog

The legal-only override is identified by:

```lua
catalogVersion = 'legal_30_rewards_80_missions_v1'
```

It replaces old catalog data with:

- Legal reward items.
- No vehicles in the diamond shop.
- No weapons.
- No dirty money.
- No regular money rewards.
- No drugs.
- No robbery/crime items.
