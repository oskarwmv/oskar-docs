# Framework Adapters

`oskar_battlepass` is designed so framework-specific logic stays open while the protected core remains stable.

## Architecture

The core calls public APIs:

```lua
BP.GetPlayerId(source)
BP.TryPayment(playerId, amount, account)
BP.GiveItem(source, item, amount, metadata)
BP.GetData(playerId, key)
BP.SetData(playerId, key, value)
```

The selected adapter translates those calls into the active framework.

## Open Files

These files should remain editable:

```text
functions/shared.lua
functions/client.lua
functions/server.lua
functions/store.lua
frameworks/vrp.lua
frameworks/esx.lua
frameworks/qbcore.lua
frameworks/qbox.lua
config/config.lua
```

Use them to adapt identity, money, inventory, permissions, groups, vehicles, SQL, profile images, and notifications.

## Protected Core Files

These files are prepared for obfuscation, escrow, or authentication:

```text
client/client.lua
server/server.lua
server/token.lua
```

Do not add framework-specific logic to these files.

## Supported Frameworks

| Framework | Adapter | Default Notes |
| --- | --- | --- |
| vRP | `frameworks/vrp.lua` | Default for the current base |
| ESX | `frameworks/esx.lua` | Uses `es_extended` and can use `oxmysql` |
| QBCore | `frameworks/qbcore.lua` | Uses `qb-core` player data and metadata |
| QBox | `frameworks/qbox.lua` | Uses `qbx_core` and defaults to `ox_inventory` |

## Adapter Responsibilities

Every adapter should provide these behaviors:

- Initialize the framework object.
- Resolve player ID from source.
- Resolve source from player ID.
- Read player name and identifier.
- Check permissions or groups.
- Read and remove money.
- Give and remove inventory items.
- Check carry capacity.
- Store and read Battle Pass data.
- Deliver vehicles if your catalog uses vehicle rewards.
- Send notifications.

## Premium Group Logic

Premium and XP boost use the same group:

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

The open server functions check the player groups through the selected adapter. If your framework uses a custom role system, edit:

```text
frameworks/<selected-framework>.lua
```

and implement:

```lua
adapter.GetUserGroups(source)
adapter.HasPermission(playerId, permission)
```

## Custom Inventory

If your server uses a custom inventory, adapt:

```lua
adapter.GiveItem(source, item, amount, metadata)
adapter.TryRemoveItem(playerId, item, amount)
adapter.CanCarryItem(source, item, amount)
adapter.GetInventoryItems(source)
adapter.GetItemName(item)
adapter.GetItemWeight(item)
adapter.GetItemType(item)
```

## Custom Garage

The active legal catalog does not sell vehicles, but the adapter API still contains vehicle delivery for bases that add vehicle rewards later.

Customize:

```lua
adapter.GiveVehicle(playerId, vehicle, metadata)
```

and the vehicle table settings for your framework.

## Data Storage

vRP can use `getUData/setUData`. Other frameworks can use `oskar_battlepass_data` or metadata.

The generic SQL table stores values by:

```text
user_id + dkey = dvalue
```

Common keys:

- `battlepass_diamonds`
- `battlepass_boxes`
- `playerLevel`
- `profileName`
- profile/cache data used by the open functions
