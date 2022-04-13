import React, { useState } from "react"
import CButton from "~/mui-c/Button"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material"
import { CloseIcon } from "~/components/icons"

interface ShoppingItemInfoProps {}

const ShoppingItemInfo: React.FC<ShoppingItemInfoProps> = ({}) => {
  const [open, setOpen] = useState(false)
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <div className="wrapper">
      <button className="back">&#8656; back</button>
      <div className="item">
        <div className="item__inner">
          <div className="item__picture">
            <img src="/avocado.jpg" alt="avocado single and halved" />
          </div>
          <div className="item__details">
            <dl>
              <div className="title">
                <dt>name</dt>
                <dd>Avocado</dd>
              </div>
              <div>
                <dt>category</dt>
                <dd>Fruit and vegetables</dd>
              </div>
              <div>
                <dt>note</dt>
                <dd>
                  Nutrient-dense foods are those that provide substantial
                  amounts of vitamins, minerals and other nutrients with
                  relatively few calories. One-third of a medium avocado (50 g)
                  has 80 calories and contributes nearly 20 vitamins and
                  minerals, making it a great nutrient-dense food choice.
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <div className="item__cta">
          <Button
            variant="text"
            sx={{
              textTransform: "none",
              fontSize: "1.5rem",
              color: "var(--clr-black)",
            }}
            onClick={handleClose}
          >
            delete
          </Button>
          <CButton
            sx={{
              fontSize: "1.5rem",
              padding: "1rem 1.5rem",
              marginLeft: "2rem",
            }}
          >
            Add to list
          </CButton>
        </div>
      </div>
      <Dialog
        keepMounted
        open={open}
        onClose={handleClose}
        sx={{
          fontSize: "1.8rem",
          "& .MuiDialog-paper": {
            borderRadius: "1.2rem",
          },
          "& .MuiDialogContent-root": {
            padding: "3rem",
          },
          "& .MuiDialogActions-root": {
            padding: "3rem",
          },
        }}
      >
        <DialogTitle sx={{ fontSize: "1.8rem" }}>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 14,
              top: 8,
              color: "var(--clr-gray11)",
            }}
          >
            <CloseIcon fontSize={"2rem"} />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          Are you sure that you want to cancel this item?
        </DialogContent>
        <DialogActions>
          <Button
            variant="text"
            autoFocus
            sx={{
              color: "var(--clr-black)",
              fontSize: "1.8rem",
              textTransform: "none",
            }}
            onClick={handleClose}
          >
            cancel
          </Button>
          <CButton
            sx={{
              background: "var(--clr-red10)",
              fontSize: "1.5rem",
              fontWeight: "bold",
            }}
          >
            Yes
          </CButton>
        </DialogActions>
      </Dialog>
      <style jsx>{`
        .wrapper {
          display: flex;
          flex-direction: column;
          background: var(--clr-white);
          padding: 4rem;
          height: 100%;
        }
        .back {
          color: var(--clr-amber10);
          font-size: 1.5rem;
          font-weight: 500;
          line-height: 1.7rem;
          text-align: left;
          margin: 1.5rem 0;
        }
        .item {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
        }
        .item__picture {
          width: 100%;
          height: auto;
          margin-bottom: 2rem;
        }
        img {
          object-fit: contain;
          border-radius: 2.5rem;
        }
        dl {
          font-weight: 500;
        }
        dl div + div {
          margin-top: 3rem;
        }
        dt {
          color: var(--clr-gray10);
          font-size: 1.2rem;
          margin: 0.5rem 0;
        }
        .title dd {
          font-size: 2.4rem;
          line-height: 3rem;
        }
        dd {
          font-size: 1.8rem;
          line-height: 2.2rem;
        }
        .item__cta {
          text-align: center;
        }
      `}</style>
    </div>
  )
}

export default ShoppingItemInfo
