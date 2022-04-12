import { Button, TextField } from "@mui/material"
import { styled } from "@mui/material/styles"
import React from "react"
import { IShoppingItem } from "~/types"
import { PencilOutlineIcon } from "./icons"

const list = {
  name: "shopping list",
  status: "incomplete",
  items: {
    "Fruits and vegetables": [
      {
        id: 1,
        name: "Tomato",
        quantity: 2,
      },
      {
        id: 2,
        name: "Apple",
        quantity: 4,
      },
    ],
    "Meat and Fish": [
      {
        id: 3,
        name: "Chicken",
        quantity: 1,
      },
    ],
    Beverages: [
      {
        id: 4,
        name: "Soda",
        quantity: 10,
      },
    ],
  },
}
const StyledButton = styled(Button)({
  padding: ".5rem 1rem",
  marginTop: "1rem",
  textTransform: "none",
  borderRadius: "1.2rem",
  backgroundColor: "var(--clr-white)",
  color: "var(--clr-black)",
  fontSize: "1.4rem",
  "&:hover": {
    backgroundColor: "var(--clr-gray1)",
  },
})
const AdditemBanner = () => {
  return (
    <div className="add-item-banner">
      <div className="banner-img">
        <img src="/source.svg" alt="source" />
      </div>
      <div className="banner-info">
        <h3>Didn’t find what you need?</h3>
        <StyledButton>Add item</StyledButton>
      </div>
      <style jsx>{`
        .add-item-banner {
          display: flex;
          width: 30rem;
          height: 13rem;
          border-radius: 2.2rem;
          background: var(--clr-brown);
          color: var(--clr-white);
        }
        .banner-img {
          flex-basis: 30%;
        }
        .banner-img img {
          width: 100%;
          height: 100%;
          object-position: 4px -19px;
        }
        .banner-info {
          padding: 1.7rem;
        }
        h3 {
          font-size: 1.6rem;
        }
      `}</style>
    </div>
  )
}

interface ShoppingListGroupProps {
  groupName: string
  items: Array<any & { quantity: number }>
}
const ShoppingListGroup: React.FC<ShoppingListGroupProps> = ({
  groupName,
  items,
}) => {
  return (
    <div>
      <h3>{groupName}</h3>
      <ul>
        {items.map((item) => (
          <ShoppingListItem
            item={item}
            quantity={item.quantity}
            key={item.id}
          />
        ))}
      </ul>
      <style jsx>{`
        div {
          margin-top: 1rem;
        }
        ul {
          list-style: none;
          padding: 0;
        }
        h3 {
          font-size: 1.4rem;
          color: var(--clr-gray9);
        }
      `}</style>
    </div>
  )
}

interface ShoppingListItemProps {
  item: IShoppingItem
  quantity?: number
}
const ShoppingListItem = ({ item, quantity = 1 }: ShoppingListItemProps) => {
  return (
    <li>
      <span>{item.name}</span>
      <button>{quantity} pcs</button>
      <style jsx>{`
        li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          line-height: 2.2rem;
          padding: 1rem 0;
        }
        span {
          font-size: 1.8rem;
          font-weight: 500;
        }
        button {
          border-radius: 2.4rem;
          border: 2px solid var(--clr-orange);
          width: 6.4rem;
          height: 3.2rem;
          color: var(--clr-orange);
          font-size: 1.2rem;
          font-weight: 500;
        }
      `}</style>
    </li>
  )
}
interface CreateShoppingListProps {}

const CreateShoppingList: React.FC<CreateShoppingListProps> = ({}) => {
  const handleEditListName = () => {}
  return (
    <div className="wrapper">
      <AdditemBanner />
      <div className="add-list">
        <div className="add-list__header">
          <h2>{list.name}</h2>
          <button title="edit list name" onClick={handleEditListName}>
            <PencilOutlineIcon aria-hidden="true" />
          </button>
        </div>
        <div className="add-list__body">
          {Object.entries(list.items).map(([key, value], i) => (
            <ShoppingListGroup
              groupName={key}
              items={value}
              key={`${key}-${i}`}
            />
          ))}
        </div>
        <div className="add-list__footer">
          <form>
            <TextField placeholder="Enter a name" />
          </form>
        </div>
      </div>
      <style jsx>{`
        .wrapper {
          padding: 4rem;
          height: 100%;
          position: relative;
        }
        .add-list {
        }
        .add-list__header {
          display: flex;
          justify-content: space-between;
          margin: 3rem 0;
          font-size: 2.4rem;
        }
        .add-list__footer {
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 13rem;
        }
        h2 {
          font-size: 2.4rem;
        }
      `}</style>
    </div>
  )
}

export default CreateShoppingList
