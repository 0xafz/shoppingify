import React from "react"
import CButton from "~/mui-c/Button"
import { Button } from "@mui/material"

interface ShoppingItemInfoProps {}

const ShoppingItemInfo: React.FC<ShoppingItemInfoProps> = ({}) => {
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
          >
            delete
          </Button>
          <CButton sx={{ fontSize: "1.5rem", padding: "1rem 1.5rem" }}>
            Add to list
          </CButton>
        </div>
      </div>
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
