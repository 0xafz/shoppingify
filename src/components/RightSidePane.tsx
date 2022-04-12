import React from "react"
import CreateShoppingItem from "./CreateShoppingItem"
import CreateShoppingList from "./CreateShoppingList"
import ShoppingItemInfo from "./ShoppingItemInfo"

interface RightSidePaneProps {
  itemType: "create-list" | "item-info" | "create-item"
}

export const RightSidePane: React.FC<RightSidePaneProps> = ({ itemType }) => {
  return (
    <aside className="right-sidepane">
      {itemType === "create-list" && <CreateShoppingList />}
      {itemType === "item-info" && <ShoppingItemInfo />}
      {itemType === "create-item" && <CreateShoppingItem />}
      <style jsx>
        {`
          .right-sidepane {
            flex-basis: 38em;
            height: 100vh;
            background: var(--clr-lightorange);
          }
        `}
      </style>
    </aside>
  )
}
