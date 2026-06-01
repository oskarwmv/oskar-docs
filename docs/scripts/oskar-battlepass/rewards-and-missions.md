# Rewards and Missions

The active catalog is balanced around 30 Battle Pass levels, 30 normal rewards, 30 premium rewards, and 80 missions.

## Leveling Rules

```lua
leveling = {
  xpPerLevel = 100,
  maxLevel = 30,
}
```

This means one level is earned every 100 XP.

```text
30 levels * 100 XP = 3000 XP
```

The mission catalog is designed to reach exactly 3000 total XP.

## Reward Tracks

There are two reward categories:

| Category | Who Can Claim |
| --- | --- |
| `normal` | Any player with the required level |
| `premium` | Players with the configured premium group and required level |

Every level has:

- 1 normal reward.
- 1 premium reward.

## Normal Rewards

Normal rewards are intentionally weaker than premium rewards.

Examples:

```lua
{ rewardTitle = 'Bandagem 2x', rewardType = 'item', rewardKey = 'bandagem', rewardAmount = 2, levelToUnlock = 1, rewardCategory = 'normal' }
{ rewardTitle = 'Repair Kit 1x', rewardType = 'item', rewardKey = 'repairkit', rewardAmount = 1, levelToUnlock = 5, rewardCategory = 'normal' }
{ rewardTitle = 'Adrenalina 2x', rewardType = 'item', rewardKey = 'adrenalina', rewardAmount = 2, levelToUnlock = 30, rewardCategory = 'normal' }
```

## Premium Rewards

Premium rewards are stronger than normal rewards and require the premium group.

Examples:

```lua
{ rewardTitle = 'Premium Bandagem 8x', rewardType = 'item', rewardKey = 'bandagem', rewardAmount = 8, levelToUnlock = 1, rewardCategory = 'premium' }
{ rewardTitle = 'Premium Mochila 3x', rewardType = 'item', rewardKey = 'mochila', rewardAmount = 3, levelToUnlock = 18, rewardCategory = 'premium' }
{ rewardTitle = 'Premium Mochila 5x', rewardType = 'item', rewardKey = 'mochila', rewardAmount = 5, levelToUnlock = 30, rewardCategory = 'premium' }
```

## Legal-Only Catalog

The active catalog avoids:

- Weapons.
- Ammunition.
- Drugs.
- Dirty money.
- Regular money.
- Vehicles.
- Crime or robbery items.

This keeps the default Battle Pass safe for legal gameplay economies.

## Mission Categories

Tasks progress by category. The current catalog includes legal job categories such as:

| Category | Example Mission |
| --- | --- |
| `cnh1` | Complete driving school |
| `uber1` | Finish Uber rides |
| `ifood1` | Complete iFood deliveries |
| `mineradora1` | Mine rocks |
| `peneira1` | Use miner sieve |
| `farm1` | Complete legal farm routes |
| `craft1` | Craft allowed items |
| `salario1` | Receive salary |
| `polvora1` | Collect powder during mining |

## Mission XP

The catalog uses two XP tiers:

- Main missions: reduced to 40 XP in the balancing pass.
- Extra missions: 25 XP each.

The total stays at 3000 XP so 30 levels remain reachable by completing the season missions.

## Adding XP From Another Script

Trigger the configured task event from the script where the mission happens:

```lua
TriggerEvent('oskar_battlepass:jobPayment', amount, taskCategory, source)
```

Examples:

```lua
TriggerEvent('oskar_battlepass:jobPayment', 1, 'uber1', source)
TriggerEvent('oskar_battlepass:jobPayment', 1, 'ifood1', source)
TriggerEvent('oskar_battlepass:jobPayment', 1, 'mineradora1', source)
```

## Claim Protection

Reward claiming is protected server-side so clicking quickly cannot claim the same reward twice.

The server validates:

- Player ID.
- Required level.
- Reward category.
- Premium access when needed.
- Previous claim state.
- Active claim lock.

## Checklist For New Seasons

- Keep `maxLevel` equal to the number of reward levels.
- Add exactly one normal reward per level.
- Add exactly one premium reward per level.
- Keep mission XP total aligned with `xpPerLevel * maxLevel`.
- Add XP events in the scripts where the mission action actually happens.
- Keep legal-only rules if the server economy requires it.
