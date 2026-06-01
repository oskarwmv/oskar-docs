# Setup and Items

Installation flow, dependency order, database behavior, inventory items, and pre-flight checks for `oskar_battlepass`.

## Required Dependencies

- A supported framework: `vrp`, `es_extended`, `qb-core`, or `qbx_core`.
- `oxmysql` for ESX, QBCore, QBox, and SQL-backed data storage.
- `ox_inventory` when using the QBox default adapter or when `useOxInventory = true`.
- `lb-phone` only if you want Instapic profile images.
- A resource or permission system capable of assigning the premium group.

## Recommended server.cfg Start Order

### vRP

```cfg
ensure vrp
ensure oskar_battlepass
```

### ESX

```cfg
ensure oxmysql
ensure es_extended
ensure oskar_battlepass
```

### QBCore

```cfg
ensure oxmysql
ensure qb-core
ensure oskar_battlepass
```

### QBox

```cfg
ensure oxmysql
ensure qbx_core
ensure ox_inventory
ensure oskar_battlepass
```

## Installation

1. Place the resource in your server resources folder.
2. Make sure the folder name is exactly `oskar_battlepass`.
3. Choose the active framework in `config/config.lua`.
4. Confirm the framework resource name inside `frameworkSettings`.
5. Confirm the required inventory items exist.
6. Start the resource after the framework and database resources.
7. Open the Battle Pass in game with `/passe`.

## Required Items

The active catalog uses legal items only. These item names must exist in your inventory:

| Item | Used For |
| --- | --- |
| `diamante` | Diamond shop and box purchases |
| `bandagem` | Rewards, boxes, store |
| `energetico` | Rewards, boxes, store |
| `vodka` | Rewards, boxes, store |
| `repairkit` | Rewards, boxes, store |
| `colete` | Rewards, boxes, store |
| `mochila` | Rewards, boxes, store |
| `adrenalina` | Rewards, boxes, store |

## OX Inventory Items

Example `ox_inventory/data/items.lua` entries:

```lua
['diamante'] = { label = 'Diamante', weight = 0, stack = true },
['bandagem'] = { label = 'Bandagem', weight = 100, stack = true },
['energetico'] = { label = 'Energetico', weight = 100, stack = true },
['vodka'] = { label = 'Vodka', weight = 100, stack = true },
['repairkit'] = { label = 'Repair Kit', weight = 500, stack = true },
['colete'] = { label = 'Colete', weight = 1000, stack = true },
['mochila'] = { label = 'Mochila', weight = 1000, stack = true },
['adrenalina'] = { label = 'Adrenalina', weight = 100, stack = true },
```

## QBCore Items

Example `qb-core/shared/items.lua` entries:

```lua
diamante = { name = 'diamante', label = 'Diamante', weight = 0, type = 'item', image = 'diamante.png', unique = false, useable = false, shouldClose = false },
bandagem = { name = 'bandagem', label = 'Bandagem', weight = 100, type = 'item', image = 'bandagem.png', unique = false, useable = true, shouldClose = true },
energetico = { name = 'energetico', label = 'Energetico', weight = 100, type = 'item', image = 'energetico.png', unique = false, useable = true, shouldClose = true },
vodka = { name = 'vodka', label = 'Vodka', weight = 100, type = 'item', image = 'vodka.png', unique = false, useable = true, shouldClose = true },
repairkit = { name = 'repairkit', label = 'Repair Kit', weight = 500, type = 'item', image = 'repairkit.png', unique = false, useable = true, shouldClose = true },
colete = { name = 'colete', label = 'Colete', weight = 1000, type = 'item', image = 'colete.png', unique = false, useable = true, shouldClose = true },
mochila = { name = 'mochila', label = 'Mochila', weight = 1000, type = 'item', image = 'mochila.png', unique = false, useable = true, shouldClose = true },
adrenalina = { name = 'adrenalina', label = 'Adrenalina', weight = 100, type = 'item', image = 'adrenalina.png', unique = false, useable = true, shouldClose = true },
```

## Database

The resource uses these Battle Pass tables:

```text
oskar_tasks
oskar_tasks_user
oskar_rewards
oskar_rewards_user
oskar_store
oskar_store_user
oskar_battlepass_data
```

For non-vRP storage, the open layer can use:

```sql
CREATE TABLE IF NOT EXISTS `oskar_battlepass_data` (
  `user_id` VARCHAR(64) NOT NULL,
  `dkey` VARCHAR(100) NOT NULL,
  `dvalue` LONGTEXT NULL,
  PRIMARY KEY (`user_id`, `dkey`) USING BTREE
);
```

## NUI Build

The resource expects the compiled UI here:

```text
web/build/index.html
web/build/**/*
```

If you edit the React source, rebuild the NUI before release. If you only edit Lua config, functions, or framework adapters, no NUI rebuild is required.

## Final Checklist

- `oskar_battlepass` starts without console errors.
- The selected framework adapter initializes.
- `diamante` exists in the inventory system.
- Legal reward items exist in the inventory system.
- `/passe` opens the UI.
- Premium group exists and can be assigned.
- Task progress events are being triggered from job scripts.
- Diamond shop purchases deliver exactly the selected quantity.
- Box opening consumes one box and gives the reward automatically after the countdown.
