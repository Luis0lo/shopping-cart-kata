import { pricingList } from "./pricingListDB.js";

const shoppingListData = [
  {
    code: 'A',
    quantity: 3,
  },
  {
    code: 'B',
    quantity: 3,
  },
  {
    code: 'C',
    quantity: 1,
  },
  {
    code: 'D',
    quantity: 2,
  },
];

export function checkout(shoppingList) {
  let shoppingListDetails = [];
  for (const [index, { code, quantity }] of shoppingList.entries()) {
    try {
      const product = findProduct(code, index);
      const productTotal = calculateProductTotal(product, quantity, index);
      shoppingListDetails = [
        ...shoppingListDetails,
        { code, quantity, productTotal },
      ];
    } catch (e) {
      console.log(e.message);
      return
    }
  }
  const subTotal = calculateShoppingListSubTotal(shoppingListDetails);
  console.log('Details: ', shoppingListDetails);
  console.log('sub total: ', subTotal);
  return subTotal;
}

export function findProduct(code, index) {
  if (code === '') throw new Error(`Invalid product code at index ${index}`);  
  return pricingList.find((product) => product.productCode === code);
}

export function calculateProductTotal({ unitPrice, specialPrice }, quantity, index) {
  if (quantity < 1) throw new Error(`You need a valid quantity at index ${index}`);  
  if (specialPrice.minQuantity) {
    const fullPriceProductUnits = quantity % specialPrice.minQuantity;
    const productBundleQuantity =
      (quantity - fullPriceProductUnits) / specialPrice.minQuantity;
    const total =
      fullPriceProductUnits * unitPrice +
      productBundleQuantity * specialPrice.bundlePrice;
    return total;
  } else {
    const total = unitPrice * quantity;
    return total;
  }
}

export function calculateShoppingListSubTotal(shoppingListDetails) {
  const subTotal = shoppingListDetails.reduce((acc, { productTotal }) => {
    return acc + productTotal;
  }, 0);
  return subTotal;
}

checkout(shoppingListData);
