import { C_Checkbox } from "~/mui-c/Checkbox"
import { useRouter } from "next/router"
import React, { useState } from "react"
import cfetch from "~/lib/cfetch"
import { TextButton, CButton, SkyButton } from "~/mui-c/Button"
import CTextField from "~/mui-c/TextField"
import { ItemInList } from "~/types"
import { unGroup } from "~/utils/client"
import { useStore } from "~/zustand"
import { DeleteOutlineIcon } from "./icons"
import { ConfirmDialog } from "~/mui-c/Dialog"

const AdditemBanner = () => {
  const dispatchDrawer = useStore((state) => state.dispatchDrawer)
  return (
    <div className="add-item-banner">
      <div className="banner-img">
        <img src="/source.svg" alt="source" />
      </div>
      <div className="banner-info">
        <h3>Didn’t find what you need?</h3>
        <TextButton
          sx={{
            padding: ".5rem 1rem",
            marginTop: "1rem",
          }}
          onClick={() =>
            dispatchDrawer({ type: "drawer:set", payload: "create-item" })
          }
        >
          Add item
        </TextButton>
      </div>
      <style jsx>{`
        .add-item-banner {
          display: flex;
          width: 30rem;
          height: 13rem;
          border-radius: 2.2rem;
          background: var(--clr-brown);
          color: var(--clr-white);
          font-size: 1rem;
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
          padding: 1.7em;
        }
        h3 {
          font-size: 1.6em;
        }
        @media (max-width: 40rem) {
          .add-item-banner {
            width: 100%;
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  )
}

interface ShoppingListGroupProps {
  groupName: string
  items: Array<ItemInList>
  listType: string
}
const ShoppingListGroup: React.FC<ShoppingListGroupProps> = ({
  groupName,
  items,
  listType,
}) => {
  return (
    <div>
      <h3>{groupName}</h3>
      <ul>
        {items.map((item) => (
          <ShoppingListItem
            {...item}
            key={item.shoppingItemId}
            listType={listType}
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

interface ShoppingListItemProps extends ItemInList {
  listType: string
}
const ShoppingListItem = ({
  itemName,
  itemCategory,
  shoppingItemId,
  quantity = 1,
  listType,
}: ShoppingListItemProps) => {
  const [showOptions, setShowOptions] = useState(false)
  const [itemPurchased, setItemPurchased] = useState(false)
  const dispatchList = useStore((state) => state.dispatchList)
  const handleDelete = () => {
    dispatchList({
      type: "list:delete-item",
      payload: {
        shoppingItemId,
        itemCategory,
      },
    })
  }
  const handlePlusMinus = (delta: -1 | 1) => {
    if (quantity === 1 && delta === -1) {
      dispatchList({
        type: "list:delete-item",
        payload: {
          shoppingItemId,
          itemCategory,
        },
      })
      return
    }
    dispatchList({
      type: "list:update-item",
      payload: {
        shoppingItemId,
        quantity: quantity + delta,
        itemCategory,
      },
    })
  }
  const toggleItemPurchase = () => {
    dispatchList({
      type: "list:toggle-item-purchase",
      payload: {
        shoppingItemId,
      },
    })
    setItemPurchased((prev) => !prev)
  }
  return (
    <li className={itemPurchased ? "checked" : ""}>
      {listType === "incomplete" ? (
        <C_Checkbox
          checked={itemPurchased}
          size={"medium"}
          onChange={toggleItemPurchase}
          inputProps={{ "aria-label": "check shopping item" }}
        />
      ) : null}
      <p>{itemName}</p>
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
        .checked button {
          color: var(--clr-gray8);
          border-color: var(--clr-gray8);
        }
        .checked p {
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
const ComposeListFooter = () => {
  const [confirmDialogOpen, setConfirmDialog] = useState(false)
  const [formError, setFormError] = useState("")
  const [loading, setLoading] = useState(false)
  const [listName, setListName] = useState("")
  const dispatchList = useStore((state) => state.dispatchList)
  const currListItems = useStore((state) => state.currListItems)
  const { id = undefined, status } = useStore((state) => state.currList)
  const router = useRouter()

  const handleListNameChange = (e: any) => {
    setListName(e.target.value)
  }
  const handleConfirmDialogClose = () => {
    setConfirmDialog(false)
  }

  const handleCancelList = async (e: any) => {
    e.stopPropagation()
    e.preventDefault()
    if (!id) {
      console.error("list id required")
      return
    }
    try {
      setFormError("")

      const result = await cfetch(`api/lists/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          status: "cancelled",
        }),
      })
      if (result.error) {
        setFormError(result.error)
        return
      }
      if (result.data) {
        dispatchList({
          type: "list:cancel-currList",
        })
        dispatchList({
          type: "list:upsert",
          payload: result.data,
        })
        router.push("/history")
      }
    } catch (error) {
      console.error(error)
    } finally {
      setConfirmDialog(false)
    }
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
          status: "incomplete",
          items: unGroup(currListItems),
        }),
      })
      if (result.error) {
        setFormError(result.error)
        return
      }
      if (result.data) {
        dispatchList({
          type: "list:add-and-set-as-currList",
          payload: result.data,
        })
        router.push("/history")
      }
    } catch (err) {
      console.error(err)
      setFormError("something went wrong!")
    } finally {
      setLoading(false)
    }
  }
  return (
    <>
      {status === "un-saved" && (
        <form onSubmit={handleSubmitList}>
          <CTextField
            placeholder="Enter a name"
            fullWidth
            value={listName}
            onChange={handleListNameChange}
            required
            InputProps={{
              endAdornment: (
                <CButton type="submit" disabled={loading}>
                  {loading ? "..." : "Save"}
                </CButton>
              ),
            }}
            error={!!formError}
            helperText={formError}
          />
        </form>
      )}

      {status === "incomplete" && (
        <>
          {formError && <p className="error">{formError}</p>}
          <div className="complete-cta">
            <TextButton onClick={() => setConfirmDialog(true)}>
              Cancel
            </TextButton>
            <SkyButton sx={{ marginLeft: "2rem" }}>Complete</SkyButton>
          </div>
          <ConfirmDialog
            open={confirmDialogOpen}
            onClose={handleConfirmDialogClose}
            onYes={handleCancelList}
          >
            Are you sure want to cancel this list?
          </ConfirmDialog>
        </>
      )}
      <style jsx>{`
        form {
          width: 100%;
        }
        .complete-cta {
          display: flex;
          width: 100%;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </>
  )
}
const ComposeList = () => {
  const currList = useStore((state) => state.currList)
  const currListItems = useStore((state) => state.currListItems)
  // const handleEditListName = () => {}

  return (
    <div className="compose-list">
      <div className="compose-list__header">
        <h2>{currList && currList.name}</h2>
        {/* <button title="edit list name" onClick={handleEditListName}>
              <PencilOutlineIcon aria-hidden="true" />
            </button> */}
      </div>
      <div className="compose-list__body styled-scrollbars">
        {currListItems &&
          currList &&
          Object.entries(currListItems || {}).map(([category, items], i) => (
            <ShoppingListGroup
              groupName={category}
              items={items}
              key={`${category}-${i}`}
              listType={currList.status}
            />
          ))}
      </div>
      <div className="compose-list__footer">
        <ComposeListFooter />
      </div>

      <style jsx>{`
        .compose-list {
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 100%;
        }
        .compose-list__body {
          flex-grow: 1;
          overflow-y: scroll;
          padding: 0rem 4rem;
        }
        .compose-list__header {
          margin: 1rem 0;
          font-size: 2.4rem;
          padding: 2rem 4rem;
        }
        .compose-list__footer {
          width: 100%;
          height: 13rem;
          padding: 4rem;
          font-size: 1.5rem;
          background-color: var(--clr-white);
        }
        .compose-list__footer {
        }
        h2 {
          font-size: 2.4rem;
        }

        @media (max-width: 768px) {
          h2 {
            font-size: 1.5rem;
          }
          .compose-list__header,
          .compose-list__body,
          .compose-list__footer {
            padding: 1.5rem;
          }
          .compose-list__footer {
            height: 8rem;
          }
        }
      `}</style>
    </div>
  )
}
interface CreateShoppingListProps {}

const CreateShoppingList: React.FC<CreateShoppingListProps> = ({}) => {
  return (
    <div className="wrapper">
      <div className="top">
        <AdditemBanner />
      </div>
      <div className="bottom">
        <ComposeList />
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
        }
        .bottom {
          flex-grow: 1;
        }
        @media (max-width: 768px) {
          .top {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  )
}

export default CreateShoppingList
