import { Button } from "@mui/material"
import { styled } from "@mui/material/styles"
import React, { useState } from "react"
import theme from "~/lib/mui-theme"
import CButton from "~/mui-c/Button"
import CTextField from "~/mui-c/TextField"
import { IShoppingItem } from "~/types"
import { useStore } from "~/zustand"
import { DeleteOutlineIcon, PencilOutlineIcon } from "./icons"

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
const BannerButton = styled(Button)({
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
  const setSidePaneType = useStore((state) => state.setSidePaneType)
  return (
    <div className="add-item-banner">
      <div className="banner-img">
        <img src="/source.svg" alt="source" />
      </div>
      <div className="banner-info">
        <h3>Didn’t find what you need?</h3>
        <BannerButton onClick={() => setSidePaneType("create-item")}>
          Add item
        </BannerButton>
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
        @media (max-width: 40rem) {
          .add-item-banner {
            width: 100%;
          }
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
  const [showOptions, setShowOptions] = useState(false)
  return (
    <li>
      <p>{item.name}</p>
      <div className="quantity">
        {showOptions && (
          <>
            <button className="delete flex-center" title="delete item">
              <DeleteOutlineIcon />
            </button>
            <button className="minus" title="decrease item count">
              -
            </button>
          </>
        )}
        <button
          className="display"
          title="quantity"
          onClick={() => setShowOptions((prev) => !prev)}
        >
          {quantity} pcs
        </button>
        {showOptions && (
          <button className="plus" title="increase item count">
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
        p {
          flex-grow: 1;
          font-size: 1.8rem;
          font-weight: 500;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          max-width: 20ch;
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
          border: 2px solid var(--clr-amber10);
          width: 6.4rem;
          height: 3.2rem;
          font-weight: 500;
          color: inherit;
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
      <div className="top">
        <AdditemBanner />
        <div className="add-list">
          <div className="add-list__header">
            <h2>{list.name}</h2>
            <button title="edit list name" onClick={handleEditListName}>
              <PencilOutlineIcon aria-hidden="true" />
            </button>
          </div>
          <div className="add-list__body styled-scrollbars">
            {Object.entries(list.items).map(([key, value], i) => (
              <ShoppingListGroup
                groupName={key}
                items={value}
                key={`${key}-${i}`}
              />
            ))}
            {Object.entries(list.items).map(([key, value], i) => (
              <ShoppingListGroup
                groupName={key}
                items={value}
                key={`${key}-${i}`}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="bottom">
        <form>
          <CTextField
            placeholder="Enter a name"
            fullWidth
            sx={{
              [theme.breakpoints.down("sm")]: {
                width: "25rem",
              },
            }}
            InputProps={{
              endAdornment: <CButton type="submit">Save</CButton>,
            }}
          />
        </form>
      </div>
      <style jsx>{`
        .wrapper {
          position: relative;
          display: flex;
          justify-content: space-between;
          flex-direction: column;
          height: 100%;
        }
        .top {
          padding: 4rem;
          padding-bottom: 0;
          flex-grow: 1;
        }
        .bottom {
          background: var(--clr-white);
          padding: 4rem;
        }
        .add-list {
          display: flex;
          flex-direction: column;
          width: 100%;
        }
        .add-list__body {
          min-height: calc(100vh - 40rem);
          max-height: calc(100vh - 40rem);
          overflow-y: scroll;
        }
        .add-list__header {
          display: flex;
          justify-content: space-between;
          margin: 3rem 0;
          font-size: 2.4rem;
        }
        .add-list__footer {
          width: 100%;
          height: 13rem;
          padding: 4rem;
          font-size: 1.5rem;
          background-color: var(--clr-white);
        }
        .add-list__footer form {
          display: flex;
          gap: 2rem;
        }
        h2 {
          font-size: 2.4rem;
        }

        @media (max-width: 768px) {
          .top,
          .bottom {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  )
}

export default CreateShoppingList
