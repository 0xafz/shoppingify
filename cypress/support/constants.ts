export const ScreenSizeToCypressPreset: Record<string, any> = {
  sm: "iphone-6",
  md: "ipad-mini",
  lg: [1024, 800],
  xl: "macbook-13",
  "2xl": "macbook-16",
};

export const Users = {
  user1: {
    name: "test user1",
    password: "dummy.pwd",
    email: "sdf1778@test.com",
  },
  user2: {
    name: "test user2",
    password: "dummy.pwd",
    email: "sdf1770@test.com",
  },
};

export const itemCategories = [
  "Fruits and vegetables",
  "Meat and Fish",
  "Beverages",
  "Groceries",
  "Other",
];

export const loginCookieName = "__Secure__User-Fgp";

export const rightSideDrawer = 'aside[data-cy="right-side-drawer"]';

export const createShoppingList = '[data-cy="CreateShoppingList"]';

export const shoppingItem = '[data-cy="shopping-item"]';

export const shoppingItemAddButton =
  'button[data-cy="add-shopping-item-tolist"]';

export const saveListNameForm = 'form[data-cy="SaveListNameForm"]';

export const completListCTA = '[data-cy="complete-cta"]';
