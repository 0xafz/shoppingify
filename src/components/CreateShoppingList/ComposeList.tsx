import { useRouter } from "next/router"
import { useState } from "react"
import cfetch from "~/lib/cfetch"
import { CButton, TextButton, SkyButton } from "~/mui-c/Button"
import { ConfirmDialog } from "~/mui-c/Dialog"
import CTextField from "~/mui-c/TextField"
import { unGroup } from "~/utils/client"
import { useStore } from "~/zustand"
import ShoppingListGroup from "./ListGroup"

const ComposeListFooter = () => {
  const [confirmDialogOpen, setConfirmDialog] = useState(false)
  const [formError, setFormError] = useState("")
  const [loading, setLoading] = useState(false)
  const [listName, setListName] = useState("")
  const dispatchList = useStore((state) => state.dispatchList)
  const currListItems = useStore((state) => state.currListItems)
  const crossedItems = useStore((state) => state.crossedItems)
  const { id = undefined, status, name } = useStore((state) => state.currList)
  const router = useRouter()

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
          type: "list:cancel",
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
  const handleSave = async (e: any) => {
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
          type: "list:save",
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
  const handleComplete = async (e: any) => {
    e.stopPropagation()
    e.preventDefault()
    try {
      setLoading(true)
      setFormError("")
      const result = await cfetch(`api/lists/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          name,
          status: "completed",
          items: crossedItems,
        }),
      })
      if (result.error) {
        setFormError(result.error)
        return
      }
      if (result.data) {
        dispatchList({
          type: "list:complete",
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
        <form onSubmit={handleSave}>
          <CTextField
            placeholder="Enter a name"
            fullWidth
            value={listName}
            onChange={(e) => setListName(e.target.value)}
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
            <SkyButton sx={{ marginLeft: "2rem" }} onClick={handleComplete}>
              Complete
            </SkyButton>
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
export default ComposeList
