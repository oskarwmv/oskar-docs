# FAQ and Troubleshooting

Common installation, configuration, and integration issues for `oskar_battlepass`.

## The Battle Pass Does Not Open

Check:

- The resource is started.
- The command is correct in `config.command`.
- The selected framework starts before `oskar_battlepass`.
- The NUI build exists in `web/build`.
- The client console has no JavaScript or Lua errors.

Default command:

```text
/passe
```

## Framework Resource Not Found

If the console says the framework resource cannot be found, check:

```lua
framework = 'qbcore'
frameworkSettings.qbcore.resource = 'qb-core'
```

Change `resource` to your real framework resource name.

## Player Is Not Premium

Premium is group-based. Confirm:

- The player has group `PassePremium`.
- The selected adapter returns the player groups correctly.
- `BP.PlayerHasGroup(source, groupName)` can see that group.
- `premiumAccess.group` matches the group used by your base.

## Premium XP Boost Does Not Apply

Check:

```lua
premiumAccess = {
  group = 'PassePremium',
  xpMultiplier = 2.0,
}
```

The same group controls premium rewards and XP boost.

## Mission Progress Does Not Update

Confirm the external job script triggers:

```lua
TriggerEvent('oskar_battlepass:jobPayment', amount, taskCategory, source)
```

Also confirm:

- `taskCategory` matches a task in `config.tasks`.
- `source` is the player source.
- The player has the required level for that mission.
- The mission is not already completed.

## Store Item Gives Too Many Items

Check:

```lua
storePurchase = {
  useItemAmountAsBase = false,
}
```

With this default, quantity `1` gives one item. If this is set to `true`, the script uses legacy pack behavior:

```text
final amount = itemAmount * selected quantity
```

## Store Item Cannot Be Bought

Check:

- The item exists in `config.store`.
- The item exists in your inventory.
- The player has enough `diamante`.
- The selected framework adapter can remove `diamante`.
- `functions/store.lua` is loaded before `functions/server.lua`.

## Box Is Not Consumed

The internal box inventory must be updated when opening a box. Confirm:

- The player owns that box type.
- The open-box callback removes one box before reward delivery.
- The UI refreshes after opening.
- There is no server error in the box callback.

## Box Reward Only Arrives After Closing

The expected behavior is:

```text
countdown finishes -> reward delivered -> box already consumed
```

If reward delivery waits for the close button, check the client open-box flow and the server callback that finalizes the box reward.

## Profile Image Does Not Use Instapic

Check:

- `lb-phone` is started.
- `useLbPhoneInstapic = true`.
- The player has a phone row in `phone_phones`.
- `phone_phones.id` matches the player license.
- `phone_instagram_accounts.profile_image` is not empty.

Fallback image:

```lua
defaultImage = 'images/jimmy_pic.webp'
```

## UI Still Has Old Yellow Hover Color

Search the NUI styles for hardcoded yellow values and replace them with configured primary color usage.

Use:

```lua
defaultColors = {
  primaryColor = 'rgb(96, 65, 180)',
  rawPrimaryColor = '96, 65, 180'
}
```

## Reward Can Be Claimed Twice With Fast Clicks

Reward claims must be locked server-side. Confirm the server validates:

- The reward exists.
- The player has the required level.
- The reward was not already claimed.
- A temporary claim lock is active during processing.

## oxmysql Error

ESX, QBCore, QBox, and SQL-backed storage require `oxmysql`.

Start order:

```cfg
ensure oxmysql
ensure oskar_battlepass
```

## Release Checklist

- Framework selector is correct.
- Open `functions/` files are included.
- Open `frameworks/` files are included.
- Protected files are not required for customer edits.
- The active catalog has 30 normal and 30 premium rewards.
- Mission XP total matches 3000 XP.
- Diamond shop is repeatable.
- Boxes are legal-only and consume correctly.
- Premium group grants rewards and XP boost.
- Profile image fallback works.
