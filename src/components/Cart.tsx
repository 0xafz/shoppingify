import React from "react"
import { CartOutlineIcon } from "./icons"

interface CartProps {}

const Cart: React.FC<CartProps> = ({}) => {
  return (
    <>
      <button title="cart" className="cart">
        <CartOutlineIcon aria-hidden="true" className="cart-icon" />
      </button>
      <style jsx>{`
        button {
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          color: var(--clr-white);
          background: var(--clr-orange);
          font-size: 2rem;
        }
      `}</style>
    </>
  )
}

export default Cart
