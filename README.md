# Porpuse

Implement a checkout system that consuming X input should return the subtotal having into consideration special prices.

# Functions

## Checkout Function

```
checkout(shoppingList)
```

### Description

- Calculate the subtotal of a shopping list having into consideration special prices.

### Parameters

- shoppingList: array of objects.

```
[
  {
    code: 'A',
    quantity: 3,
  }
]
```

### Returns

- Subtotal of shopping list.

## Find product Function

```
findProduct(code, index)
```

### Description

- Looks for the product details in pricing list database.
```
[
    {
      productCode: 'A',
      unitPrice: 50,
      specialPrice: {
        minQuantity: 3,
        bundlePrice: 140,
      },
    }
]
```

### Parameters

- code: product code from shopping list.
- index: shopping list product index.

### Returns

- Product details as an array of objects

## Calculate product total Function

```
calculateProductTotal({ unitPrice, specialPrice }, quantity, index)
```

### Description

- Multiplies product price by quantity after checking if the product has a special price.

### Parameters

- unitPrice: normal price.
- specialPrice: contains minQuantity and bundlePrice proprety.
- quantity: product total units.
- index: shopping list product index.

### Returns

- Each product total as an integer.

## Calculate shopping list subtotal Function

```
calculateShoppingListSubtotal(shoppingListDetails)
```

### Description

- Add the total of each product in the list.

### Parameters

- shoppingListDetails: contains each product total.

### Returns

- Each product total added together as an integer.

# Running Tests

- Make sure to install dev dependecies - `npm i`
- Run test using command - `npm run test`
- [index.test.js](./index.test.js)
- [Jest docs](https://jestjs.io/docs/getting-started)
