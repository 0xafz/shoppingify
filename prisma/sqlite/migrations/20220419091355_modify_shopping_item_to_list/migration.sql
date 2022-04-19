/*
  Warnings:

  - Added the required column `itemCategory` to the `ShoppingItemToList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `itemName` to the `ShoppingItemToList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `itemPurchased` to the `ShoppingItemToList` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ShoppingItemToList" (
    "shoppingItemId" INTEGER NOT NULL,
    "shoppingListId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "itemName" TEXT NOT NULL,
    "itemCategory" TEXT NOT NULL,
    "assignedBy" INTEGER NOT NULL,
    "assignedAt" DATETIME NOT NULL,
    "itemPurchased" BOOLEAN NOT NULL,

    PRIMARY KEY ("shoppingListId", "shoppingItemId"),
    CONSTRAINT "ShoppingItemToList_shoppingListId_fkey" FOREIGN KEY ("shoppingListId") REFERENCES "ShoppingList" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ShoppingItemToList_shoppingItemId_fkey" FOREIGN KEY ("shoppingItemId") REFERENCES "ShoppingItem" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ShoppingItemToList" ("assignedAt", "assignedBy", "quantity", "shoppingItemId", "shoppingListId") SELECT "assignedAt", "assignedBy", "quantity", "shoppingItemId", "shoppingListId" FROM "ShoppingItemToList";
DROP TABLE "ShoppingItemToList";
ALTER TABLE "new_ShoppingItemToList" RENAME TO "ShoppingItemToList";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
