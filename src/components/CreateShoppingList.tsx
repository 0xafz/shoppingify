import Button from "@mui/material/Button"
import { styled } from "@mui/material/styles"
import { useRouter } from "next/router"
import React, { useState } from "react"
import cfetch from "~/lib/cfetch"
import theme from "~/lib/mui-theme"
import { CButton } from "~/mui-c/Button"
import CTextField from "~/mui-c/TextField"
import { ItemInList } from "~/types"
import { unGroup } from "~/utils/client"
import { useStore } from "~/zustand"
import { DeleteOutlineIcon, PencilOutlineIcon } from "./icons"

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
  const dispatchDrawer = useStore((state) => state.dispatchDrawer)
  return (
    <div className="add-item-banner">
      <div className="banner-img">
        <img src="/source.svg" alt="source" />
      </div>
      <div className="banner-info">
        <h3>Didn’t find what you need?</h3>
        <BannerButton
          onClick={() =>
            dispatchDrawer({ type: "drawer:set", payload: "create-item" })
          }
        >
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
  items: Array<ItemInList>
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
            category={groupName}
            {...item}
            key={item.shoppingItemId}
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

interface ShoppingListItemProps extends ItemInList {}
const ShoppingListItem = ({
  name,
  category,
  shoppingItemId,
  quantity = 1,
}: ShoppingListItemProps) => {
  const [showOptions, setShowOptions] = useState(false)
  const dispatchList = useStore((state) => state.dispatchList)
  const handleDelete = () => {
    dispatchList({
      type: "list:delete-item",
      payload: {
        shoppingItemId,
        category,
      },
    })
  }
  const handlePlusMinus = (delta: -1 | 1) => {
    if (quantity === 1 && delta === -1) {
      dispatchList({
        type: "list:delete-item",
        payload: {
          shoppingItemId,
          category,
        },
      })
      return
    }
    dispatchList({
      type: "list:update-item",
      payload: {
        shoppingItemId,
        quantity: quantity + delta,
        category,
      },
    })
  }
  return (
    <li>
      <p>{name}</p>
      <div className="quantity">
        {showOptions && (
          <>
            <button
              className="delete flex-center"
              title="delete item"
              onClick={handleDelete}
            >
              <DeleteOutlineIcon aria-hidden="true" />
            </button>
            <button
              className="minus"
              title="decrease item count"
              onClick={() => handlePlusMinus(-1)}
            >
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
          <button
            className="plus"
            title="increase item count"
            onClick={() => handlePlusMinus(+1)}
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
  const [listName, setListName] = useState("")
  const [formError, setFormError] = useState("")
  const [loading, setLoading] = useState(false)
  const currList = useStore((state) => state.currList)
  const currListItems = useStore((state) => state.currListItems)
  const dispatchList = useStore((state) => state.dispatchList)
  const router = useRouter()
  const handleEditListName = () => {}
  const handleListNameChange = (e: any) => {
    setListName(e.target.value)
  }
  const handleSubmitList = async (e: any) => {
    e.stopPropagation()
    e.preventDefault()
    try {
      setLoading(true)
      setFormError("")
      const result = await cfetch("api/lists", {
        method: "POST",
        body: JSON.stringify({
          name: listName,
          items: unGroup(currListItems),
        }),
      })
      if (result.error) {
        setFormError(result.error)
        return
      }
      if (result.data) {
        dispatchList({
          type: "list:add",
          payload: result.data,
        })
        router.push("history")
      }
    } catch (err) {
      console.error(err)
      setFormError("something went wrong!")
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="wrapper">
      <div className="top">
        <AdditemBanner />
        <div className="add-list">
          <div className="add-list__header">
            <h2>{currList.name}</h2>
            <button title="edit list name" onClick={handleEditListName}>
              <PencilOutlineIcon aria-hidden="true" />
            </button>
          </div>
          <div className="add-list__body styled-scrollbars">
            {currListItems &&
              Object.entries(currListItems || {}).map(
                ([category, items], i) => (
                  <ShoppingListGroup
                    groupName={category}
                    items={items}
                    key={`${category}-${i}`}
                  />
                )
              )}
          </div>
        </div>
      </div>
      <div className="bottom">
        <form onSubmit={handleSubmitList}>
          <CTextField
            placeholder="Enter a name"
            fullWidth
            value={listName}
            onChange={handleListNameChange}
            sx={{
              [theme.breakpoints.down("sm")]: {
                width: "25rem",
              },
            }}
            InputProps={{
              endAdornment: (
                <CButton type="submit" disabled={loading}>
                  {loading ? "loading..." : "Save"}
                </CButton>
              ),
            }}
            error={!!formError}
            helperText={formError}
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
