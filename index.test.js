import {
  checkout,
  findProduct,
  calculateProductTotal,
  calculateShoppingListSubtotal,
  shoppingListData,
} from './index';

describe('Checkout fn', () => {
  it('should return the correct sub total.', () => {
    const shoppingList = [
      {
        code: 'A',
        quantity: 3,
      },
      {
        code: 'B',
        quantity: 3,
      },
    ];
    const expected = 235;
    const actual = checkout(shoppingList);
    expect(actual).toBe(expected);
  });
  it('should return undefined if shopping list is empty', () => {
    const shoppingList = [];

    expect(checkout(shoppingList)).toBe(undefined);
  });
});

describe('Find Product fn', () => {
  it('should find and return product details from DB', () => {
    const expected = {
      productCode: 'A',
      unitPrice: 50,
      specialPrice: { minQuantity: 3, bundlePrice: 140 },
    };
    const actual = findProduct('A');

    expect(actual).toEqual(expected);
  });
  it('should thrown an error if code is an empty string', () => {
    const code = '';
    const index = 0;
    const expected = `Invalid product code at index 0`;
    const actual = () => {
      findProduct(code, index);
    };

    expect(actual).toThrow(expected);
  });
  it('should thrown an error if code does not match any code on the DB', () => {
    const code = 'G';
    const index = 0;
    const expected = `Product code at index 0 not found in the DB`;
    const actual = () => {
      findProduct(code, index);
    };

    expect(actual).toThrow(expected);
  });
});

describe('Calculate Product Total fn', () => {
  it('should return correct total', () => {
    const product = {
      unitPrice: 12,
      specialPrice: { minQuantity: null, bundlePrice: null },
    };
    const quantity = 4;
    const index = 0;
    const expected = 48;
    const actual = calculateProductTotal(product, quantity, index);

    expect(actual).toBe(expected);
  });

  it('should return correct total having special prices.', () => {
    const product = {
      unitPrice: 50,
      specialPrice: { minQuantity: 2, bundlePrice: 80 },
    };
    const quantity = 3;
    const index = 0;
    const expected = 130;
    const actual = calculateProductTotal(product, quantity, index);

    expect(actual).toBe(expected);
  });
  it('should thrown an error if product quantity is less than 1.', () => {
    const product = {
      unitPrice: 12,
      specialPrice: { minQuantity: null, bundlePrice: null },
    };
    const quantity = 0;
    const index = 0;
    const expected = `You need a valid quantity at index 0`;
    const actual = () => {
      calculateProductTotal(product, quantity, index);
    };

    expect(actual).toThrow(expected);
  });
});

describe('Calculate sub total fn', () => {
  it('should return correct sub total', () => {
    const details = [
      { productTotal: 140 },
      { productTotal: 95 },
      { productTotal: 25 },
      { productTotal: 24 },
    ];
    const expected = 284;
    const actual = calculateShoppingListSubtotal(details);

    expect(actual).toBe(expected);
  });
});

describe('Shopping list', () => {
  it('should contain properties (code, quantity)', () => {
    for (let i = 0; i < shoppingListData.length; i++) {
      expect(shoppingListData[i]).toHaveProperty('code');
      expect(shoppingListData[i]).toHaveProperty('quantity');
    }
  });
});
