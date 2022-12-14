# Shopping Cart Kata

# Porpuse

Implement a checkout system that consuming X input should return the subtotal having into consideration special prices.

| Item Code | Unit Price | Special Price |
| :-------- | :--------- | :------------ |
| A         | 50         | 3 for 140     |
| B         | 35         | 2 for 60      |
| C         | 25         |               |
| D         | 12         |               |

input:

```
[
  {
    code: "A",
    quantity: 3
  },
  {
    code: "B",
    quantity: 3
  },
  {
    code: "C",
    quantity: 1
  },
  {
    code: "D",
    quantity: 2
  }
]
```
expected result: 284

# Functions

[checkout()](#checkout-function) -
[findProduct()](#find-product-function) -
[calculateProductTotal()](#calculate-product-total-function) -
[calculateShoppingListSubtotal()](#calculate-shopping-list-subtotal-function)

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

## Feedback

- We would have liked the application to consume actual data sources (e.g. json files) like the one provided, rather than being hardcoded with the data-set.
- The ability to create sub-totals would be good to provide, as they would probably be required if we wanted a production checkout system (i.e. Scan half the data, provide a subtotal and then add more to the basket before working out the total).
- The provided solution didn't account for 2 different entries for the same product type, i.e. {code: A, quantity: 2}, {code: A, quantity: 1} results in 150, not 140 as it should.
