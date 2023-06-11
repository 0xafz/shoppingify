import { useState } from "react";
import { C_Checkbox } from "~/mui-c/Checkbox";
import { ItemInList } from "~/types";
import { useStore } from "~/zustand";
import { DeleteOutlineIcon } from "../icons";

interface ShoppingListItemProps extends ItemInList {
  listType: string;
}
const ShoppingListItem = ({
  itemName,
  itemCategory,
  shoppingItemId,
  quantity = 1,
  listType,
}: ShoppingListItemProps) => {
  const [showOptions, setShowOptions] = useState(false);
  const [itemPurchased, setItemPurchased] = useState(false);
  const dispatchList = useStore((state) => state.dispatchList);
  const handleDelete = () => {
    dispatchList({
      type: "list:delete-item",
      payload: {
        shoppingItemId,
        itemCategory,
      },
    });
  };
  const handlePlusMinus = (delta: -1 | 1) => {
    if (quantity === 1 && delta === -1) {
      dispatchList({
        type: "list:delete-item",
        payload: {
          shoppingItemId,
          itemCategory,
        },
      });
      return;
    }
    dispatchList({
      type: "list:update-item-quantity",
      payload: {
        shoppingItemId,
        quantity: quantity + delta,
        itemCategory,
      },
    });
  };
  const toggleItemPurchase = (e: any) => {
    dispatchList({
      type: "list:toggle-item-purchase",
      payload: {
        shoppingItemId,
        quantity,
        itemCategory,
        itemName,
        itemPurchased: e.target.checked,
      },
    });
    setItemPurchased(e.target.checked);
  };
  return (
    <li className={itemPurchased ? "checked" : ""}>
      {listType === "incomplete" ? (
        <C_Checkbox
          checked={itemPurchased}
          size={"medium"}
          onChange={toggleItemPurchase}
          inputProps={{ "aria-label": "mark item as done" }}
        />
      ) : null}
      <span>{itemName}</span>
      <div className="quantity">
        {showOptions && (
          <>
            <button
              className="delete flex-center"
              title="delete item"
              onClick={handleDelete}
              aria-label="delete-item"
            >
              <DeleteOutlineIcon aria-hidden="true" />
            </button>
            <button
              className="minus"
              title="decrease item count"
              onClick={() => handlePlusMinus(-1)}
              aria-label="decrease item quantity by 1"
            >
              -
            </button>
          </>
        )}
        <button
          className="display"
          title="quantity"
          onClick={() => setShowOptions((prev) => !prev)}
          aria-label="adjust quantity of this item"
        >
          <strong>{quantity} pcs</strong>
        </button>
        {showOptions && (
          <button
            className="plus"
            title="increase item count"
            onClick={() => handlePlusMinus(+1)}
            aria-label="increase item quantity by 1"
          >
            +
          </button>
        )}
      </div>
      <style jsx>{`
        li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          line-height: 2.2rem;
          padding: 1rem 0;
        }
        span {
          flex-grow: 1;
          font-size: 1.8rem;
          font-weight: 500;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          max-width: 20ch;
        }
        .checked button {
          color: var(--clr-gray8);
          border-color: var(--clr-gray8);
        }
        .checked span {
          text-decoration: line-through;
          color: var(--clr-gray8);
        }
        .quantity {
          display: flex;
          align-items: center;
          min-height: 4rem;
          font-size: 1.5rem;
          background-color: ${showOptions ? "var(--clr-white)" : "inherit"};
          border-radius: 1.2rem;
          color: var(--clr-amber10);
          transition: all 0.3s ease;
        }
        .plus,
        .minus {
          padding: 0.5rem 1rem;
          font-size: 2rem;
          font-weight: 500;
          color: inherit;
        }
        .delete {
          width: 3rem;
          border-radius: inherit;
          padding: 0.5rem;
          background-color: var(--clr-amber10);
          color: var(--clr-white);
          align-self: stretch;
          text-align: center;
        }
        .display {
          border-radius: 2.4rem;
          border: 1px solid var(--clr-amber9);
          width: 6.4rem;
          height: 3.2rem;
          font-weight: 500;
          color: var(--clr-amber10);
        }
      `}</style>
    </li>
  );
};
export default ShoppingListItem;
