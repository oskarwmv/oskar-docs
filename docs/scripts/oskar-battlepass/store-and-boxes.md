# Store and Boxes

The Battle Pass includes a diamond shop, purchasable boxes, and an internal Battle Pass box inventory.

## Diamond Shop

The shop is a simple repeatable store. Buying an item:

- Does not mark the item as purchased.
- Does not block future purchases.
- Does not write an `already purchased` state.
- Uses diamonds as the payment item.
- Gives one unit by default unless the player selects a larger quantity.

## Quantity Rules

```lua
storePurchase = {
  useItemAmountAsBase = false,
  minQuantity = 1,
  maxQuantity = 99,
  vehicleQuantity = 1,
}
```

Default behavior:

```text
selected quantity = delivered amount
```

So if `Vodka` is configured with `itemAmount = 10` but the player selects quantity `1`, the player receives `1` vodka.

Legacy pack behavior:

```lua
useItemAmountAsBase = true
```

```text
final amount = itemAmount * selected quantity
```

## Active Store Items

The active legal catalog sells:

| Item | Category | Notes |
| --- | --- | --- |
| `bandagem` | `saude` | Health item |
| `colete` | `saude` | Armor item |
| `adrenalina` | `saude` | Recovery item |
| `energetico` | `bebidas` | Drink item |
| `vodka` | `bebidas` | Drink item |
| `repairkit` | `utilitarios` | Utility item |
| `mochila` | `utilitarios` | Utility item |

The active store does not sell vehicles, weapons, drugs, money, dirty money, or illegal items.

## Store Security

The server resolves the item by `item_id` from `config.store`. It does not trust client-provided item names, prices, reward keys, or promotion flags.

The open helper file is:

```text
functions/store.lua
```

Important helpers:

```lua
BP.GetStoreItemById(itemId)
BP.NormalizeStoreQuantity(quantity)
BP.GetStoreUnitPrice(itemPrice, promotionPrice, isPromotion)
BP.GetStoreRewardAmount(itemType, itemAmount, quantity)
BP.GetStoreTotalPrice(unitPrice, quantity, itemType)
```

## Boxes

The active catalog has 6 legal boxes:

| Box | Config Key | Purpose |
| --- | --- | --- |
| Caixa Comum | `box_01` | Entry-level legal rewards |
| Caixa Rara | `box_02` | Better legal utility rewards |
| Caixa Epica | `box_03` | Higher utility rewards |
| Caixa Lendaria | `box_04` | Stronger legal rewards |
| Caixa Suprema | `box_05` | High-tier legal rewards |
| Caixa Premium | `box_06` | Best legal box rewards |

Boxes are bought with:

```lua
buyBoxWith = 'diamante'
```

## Box Inventory

Boxes are stored inside the Battle Pass internal inventory, not necessarily the framework inventory.

When a player opens a box:

1. The server checks the player owns that box type.
2. One box is consumed from Battle Pass inventory.
3. The reward roll is resolved.
4. The reward is delivered after the countdown finishes.
5. The UI updates the remaining box count.

## Box Reward Rules

Each box item has:

```lua
{
  index = 'bandagem',
  title = 'Bandagem',
  probabilty = 55,
  quantity = 2,
  image = 'images/bandage.png',
  color = '140, 140, 140',
  type = 'usar'
}
```

The probabilities inside each box should add up to a sensible distribution. They do not need to be identical across boxes.

## Images

Store and box cards should use item images based on the item name whenever possible.

Recommended image convention:

```text
images/<item_name>.png
```

Examples:

```text
images/vodka.png
images/repairkit.png
images/mochila.png
```
