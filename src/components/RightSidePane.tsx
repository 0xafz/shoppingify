import React from "react"
import { useStore } from "~/zustand"
import CreateShoppingItem from "./CreateShoppingItem"
import CreateShoppingList from "./CreateShoppingList"
import ShoppingItemInfo from "./ShoppingItemInfo"

interface RightSidePaneProps {}

export const RightSidePane: React.FC<RightSidePaneProps> = ({}) => {
  const sidePaneType = useStore((state) => state.sidePaneType)
  return (
    <aside className="right-sidepane">
      {sidePaneType === "create-list" && <CreateShoppingList />}
      {sidePaneType === "item-info" && <ShoppingItemInfo />}
      {sidePaneType === "create-item" && <CreateShoppingItem />}
      <style jsx>
        {`
          .right-sidepane {
            position: sticky;
            top: 0;
            flex-basis: 40rem;
            flex-shrink: 0;
            min-width: 38rem;
            overflow-y: scroll;
            height: 100vh;
            background: var(--clr-lightorange);
            box-shadow: var(--elevation3);
          }
          @media (max-width: 1024px) {
            .right-sidepane {
              position: fixed;
              left: calc(9.3rem + 2rem);
              right: 0;
              flex-basis: auto;
              min-width: auto;
            }
          }
          @media (max-width: 768px) {
            .right-sidepane {
              left: calc(6rem + 2rem);
              right: 0;
              flex-basis: auto;
              min-width: auto;
            }
          }
        `}
      </style>
    </aside>
  )
}
