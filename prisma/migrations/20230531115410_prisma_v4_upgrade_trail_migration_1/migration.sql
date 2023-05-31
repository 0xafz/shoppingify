-- AddForeignKey
ALTER TABLE `ShoppingList` ADD CONSTRAINT `ShoppingList_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ShoppingItemToList` ADD CONSTRAINT `ShoppingItemToList_shoppingListId_fkey` FOREIGN KEY (`shoppingListId`) REFERENCES `ShoppingList`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ShoppingItemToList` ADD CONSTRAINT `ShoppingItemToList_shoppingItemId_fkey` FOREIGN KEY (`shoppingItemId`) REFERENCES `ShoppingItem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
