# Integrations and API

This page documents public events, callbacks, and open APIs used to integrate `oskar_battlepass` with jobs, phones, frameworks, and custom server bases.

## Open Battle Pass

Default command:

```text
/passe
```

Open store from another client script:

```lua
TriggerEvent('oskar_battlepass:openShop')
```

## Task Progress Event

Configured event:

```lua
paymentEvent = 'oskar_battlepass:jobPayment'
```

Usage:

```lua
TriggerEvent('oskar_battlepass:jobPayment', amount, taskCategory, source)
```

Examples:

```lua
TriggerEvent('oskar_battlepass:jobPayment', 1, 'uber1', source)
TriggerEvent('oskar_battlepass:jobPayment', 1, 'ifood1', source)
TriggerEvent('oskar_battlepass:jobPayment', 1, 'craft1', source)
```

Add this event inside the script where the mission action is completed. For example, an Uber mission should trigger the event when the ride is finished and paid.

## Premium

Premium is checked by group:

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

When the player has the group, they get:

- Access to premium rewards.
- XP boost using the configured multiplier.

The old database premium purchase model should not be used for the active setup.

## Profile Name

External systems can update profile display names with:

```lua
TriggerEvent('oskar_groups:profileNamePlayer', user_id, profileName)
```

## Profile Image

The server-side open function is:

```lua
BP.GetBattlepassProfileImage(source, user_id)
```

Default behavior:

1. Try `lb-phone` Instapic/Instagram image when enabled.
2. Use configured default image if no phone image exists.
3. Keep the image square in the UI.

The `lb-phone` database lookup expects:

```sql
SELECT i.profile_image
FROM phone_instagram_accounts i
INNER JOIN phone_phones p ON p.phone_number = i.phone_number
WHERE p.id = @license
LIMIT 1
```

## Server Callback Layer

The open callback bridge is implemented in:

```text
functions/server.lua
functions/client.lua
```

Server callbacks are registered with:

```lua
BP.RegisterCallback(name, handler)
```

Client calls are made with:

```lua
BPClient.Callback(name, payload, timeout)
```

## Main Server API

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

BP.GetData(playerId, key)
BP.SetData(playerId, key, value)

BP.Notify(source, type, message)
```

## Main Client API

```lua
BPClient.SendReactMessage(action, data)
BPClient.DebugPrint(...)
BPClient.OnInterfaceDisplayed()
BPClient.OnInterfaceHidden()
BPClient.GetProfileImage()
BPClient.Callback(name, payload, timeout)
```

## Notification Event

Client notification event:

```lua
RegisterNetEvent('battlepass:notify')
```

Default usage:

```lua
TriggerClientEvent('battlepass:notify', source, 'success', 'Message')
```

Customize the actual notification UI inside the selected framework adapter or open client functions.
