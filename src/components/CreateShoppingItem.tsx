import { Autocomplete, Button, TextField } from "@mui/material"
import React from "react"

interface AddShoppingItemProps {}

const categories = ["Fruits and vegetables", "Meat and Fish", "Beverages"]
const AddShoppingItem: React.FC<AddShoppingItemProps> = ({}) => {
  return (
    <div className="wrapper">
      <h2>Add a new item</h2>
      <form action="">
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
            disablePortal
            id="combo-box-demo"
            options={categories}
            fullWidth
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
        </div>

        <div className="cta">
          <Button variant="text" sx={{ color: "var(--clr-black)" }}>
            Cancel
          </Button>
          <Button variant="contained" sx={{ background: "var(--clr-orange)" }}>
            Save
          </Button>
        </div>
      </form>
      <style jsx>{`
        h2 {
          font-size: 2.4em;
          margin-bottom: 2em;
        }
        .wrapper {
          padding: 4em;
        }
        .cta {
          margin: 3em 0;
          display: flex;
          justify-content: center;
          gap: 1.5em;
        }
        .row + .row {
          margin-top: 2rem;
        }
        .row label {
          display: block;
          font-size: 1.4em;
          font-weight: 500;
          line-height: 1.7em;
        }
      `}</style>
    </div>
  )
}

export default AddShoppingItem
