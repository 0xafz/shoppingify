import { Autocomplete, Button } from "@mui/material"
import React from "react"
import CButton from "~/mui-c/Button"
import CTextField from "~/mui-c/TextField"
import styled from "@mui/system/styled"
import { useStore } from "~/zustand"
import theme from "~/lib/mui-theme"

interface AddShoppingItemProps {}

const TextField = styled(CTextField)({
  [theme.breakpoints.down("sm")]: {
    width: "25rem",
  },
})
const categories = ["Fruits and vegetables", "Meat and Fish", "Beverages"]
const AddShoppingItem: React.FC<AddShoppingItemProps> = ({}) => {
  const setSidePaneType = useStore((state) => state.setSidePaneType)
  return (
    <div className="wrapper">
      <h2>Add a new item</h2>
      <form action="">
        <div className="form__fields">
          <div className="row">
            <label htmlFor="name">Name</label>
            <TextField id="name" placeholder="Enter a name" fullWidth />
          </div>

          <div className="row">
            <label htmlFor="note">Note (optional)</label>
            <TextField
              id="note"
              multiline
              placeholder="Enter a note"
              fullWidth
              minRows={5}
              maxRows={10}
            />
          </div>

          <div className="row">
            <label htmlFor="image">Image (optional)</label>
            <TextField id="image" placeholder="Enter a url" fullWidth />
          </div>

          <div className="row">
            <label htmlFor="image">Category</label>
            <Autocomplete
              sx={{ fontSize: "1.5rem" }}
              disablePortal
              id="combo-box-demo"
              options={categories}
              fullWidth
              ListboxProps={{
                style: {
                  fontSize: "1.5rem",
                },
              }}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </div>
        </div>

        <div className="form__cta">
          <Button
            variant="text"
            sx={{
              color: "var(--clr-black)",
              textTransform: "none",
              fontSize: "1.5rem",
            }}
            onClick={() => setSidePaneType("create-list")}
          >
            Cancel
          </Button>
          <CButton
            variant="contained"
            sx={{
              background: "var(--clr-amber10)",
              padding: "1rem 1.5rem",
              fontSize: "1.5rem",
            }}
          >
            Save
          </CButton>
        </div>
      </form>
      <style jsx>{`
        h2 {
          font-size: 2.4rem;
          margin-bottom: 2rem;
        }
        .wrapper {
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 100%;
          padding: 4rem;
        }
        form {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .form__cta {
          margin: 3rem 0;
          display: flex;
          justify-content: center;
          gap: 1.5rem;
        }
        .row + .row {
          margin-top: 2rem;
        }
        .row label {
          display: block;
          font-size: 1.4rem;
          font-weight: 500;
          line-height: 1.7rem;
          margin-bottom: 1rem;
        }
        @media (max-width: 768px) {
          .wrapper {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  )
}

export default AddShoppingItem
