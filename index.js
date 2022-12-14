import { pricingList } from "./pricingListDB.js";

 export const shoppingListData = [
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

  if (!shoppingList.length) return;  

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
  const subtotal = calculateShoppingListSubtotal(shoppingListDetails);
  console.log('Details: ', shoppingListDetails);
  console.log('sub total: ', subtotal);
  return subtotal;
}

export function findProduct(code, index) {
  if (code === '') throw new Error(`Invalid product code at index ${index}`);  
  const productDetails =  pricingList.find((product) => product.productCode === code);
  if (!productDetails) throw new Error(`Product code at index ${index} not found in the DB`);  
  return productDetails
}

export function calculateProductTotal({ unitPrice, specialPrice }, quantity, index) {
  if (quantity < 1) throw new Error(`You need a valid quantity at index ${index}`);  
  if (unitPrice < 1) throw new Error(`You need a valid price at index ${index}`);  

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

export function calculateShoppingListSubtotal(shoppingListDetails) {
  const subtotal = shoppingListDetails.reduce((acc, { productTotal }) => {
    return acc + productTotal;
  }, 0);
  return subtotal;
}

checkout(shoppingListData);
