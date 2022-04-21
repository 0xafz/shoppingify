import { useRouter } from "next/router"
import { useState } from "react"
import cfetch from "~/lib/cfetch"
import { TextButton, SkyButton } from "~/mui-c/Button"
import { ConfirmDialog } from "~/mui-c/Dialog"
import { useStore } from "~/zustand"

const CompleteCancelCTA = () => {
  const [confirmDialogOpen, setConfirmDialog] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { id = undefined, name } = useStore((state) => state.currList)
  const dispatchList = useStore((state) => state.dispatchList)
  const crossedItems = useStore((state) => state.crossedItems)
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
      setError("")
      setLoading(true)
      const result = await cfetch(`api/lists/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          status: "cancelled",
        }),
      })
      if (result.error) {
        setError(result.error)
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
      setLoading(false)
      setConfirmDialog(false)
    }
  }

  const handleComplete = async (e: any) => {
    e.stopPropagation()
    e.preventDefault()
    try {
      setLoading(true)
      setError("")
      const result = await cfetch(`api/lists/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          name,
          status: "completed",
          items: crossedItems,
        }),
      })
      setLoading(false)
      if (result.error) {
        setError(result.error)
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
      setError("something went wrong!")
    }
  }
  return (
    <>
      {error && <p className="error">{error}</p>}
      <div className="complete-cta">
        <TextButton onClick={() => setConfirmDialog(true)}>Cancel</TextButton>
        <SkyButton
          sx={{ marginLeft: "2rem" }}
          onClick={handleComplete}
          variant="contained"
        >
          Complete
        </SkyButton>
      </div>
      <ConfirmDialog
        open={confirmDialogOpen}
        onClose={handleConfirmDialogClose}
        onYes={handleCancelList}
        onYesLoading={loading}
      >
        Are you sure want to cancel this list?
      </ConfirmDialog>
      <style jsx>{`
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
export default CompleteCancelCTA
