import React from "react";
import { useStore } from "~/zustand";
import CreateShoppingItem from "./CreateShoppingItem";
import CreateShoppingList from "./CreateShoppingList";
import ShoppingItemInfo from "./ShoppingItemInfo";

interface RightSideDrawerProps {}

const RightSideDrawer: React.FC<RightSideDrawerProps> = ({}) => {
  const rightSideDrawerType = useStore((state) => state.rightSideDrawerType);
  const itemInDrawer = useStore((state) => state.itemInDrawer);
  return (
    <aside
      data-cy="right-side-drawer"
      className="right-side-drawer"
      id="right-side-drawer"
      tabIndex={-1}
      aria-label="Drawer"
    >
      {rightSideDrawerType === "create-list" && <CreateShoppingList />}
      {rightSideDrawerType === "item-info" && (
        <ShoppingItemInfo item={itemInDrawer} />
      )}
      {rightSideDrawerType === "create-item" && <CreateShoppingItem />}
      <style jsx>
        {`
          .right-side-drawer {
            z-index: 9999;
            position: fixed;
            // left: calc(9.3rem + 2rem);
            right: 0;
            flex-basis: 40rem;
            flex-shrink: 0;
            min-width: 38rem;
            // overflow-y: scroll;
            height: 100%;
            background: var(--clr-lightorange);
            box-shadow: var(--elevation3);
          }
          @media (max-width: 1024px) {
            .right-side-drawer {
              position: fixed;
              // left: calc(9.3rem + 2rem);
              right: 0;
              flex-basis: auto;
              // min-width: auto;
            }
          }
          @media (max-width: 568px) {
            .right-side-drawer {
              left: calc(6rem + 2rem);
              right: 0;
              flex-basis: auto;
              min-width: auto;
            }
          }
        `}
      </style>
    </aside>
  );
};

export default RightSideDrawer;
