-- CreateIndex
CREATE INDEX `ShoppingItem_userId_idx` ON `ShoppingItem`(`userId`);

-- CreateIndex
CREATE INDEX `ShoppingItemToList_assignedBy_idx` ON `ShoppingItemToList`(`assignedBy`);

-- CreateIndex
CREATE INDEX `ShoppingItemToList_shoppingListId_idx` ON `ShoppingItemToList`(`shoppingListId`);

-- CreateIndex
CREATE INDEX `ShoppingItemToList_shoppingItemId_idx` ON `ShoppingItemToList`(`shoppingItemId`);

-- CreateIndex
CREATE INDEX `ShoppingList_userId_idx` ON `ShoppingList`(`userId`);
