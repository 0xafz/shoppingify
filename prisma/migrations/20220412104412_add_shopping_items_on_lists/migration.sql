/*
  Warnings:

  - You are about to drop the `_ShoppingItemToShoppingList` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_ShoppingItemToShoppingList";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "ShoppingItemsOnLists" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "shoppingItemId" INTEGER NOT NULL,
    "shoppingListId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "assignedBy" INTEGER NOT NULL,
    CONSTRAINT "ShoppingItemsOnLists_shoppingListId_fkey" FOREIGN KEY ("shoppingListId") REFERENCES "ShoppingList" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ShoppingItemsOnLists_shoppingItemId_fkey" FOREIGN KEY ("shoppingItemId") REFERENCES "ShoppingItem" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
