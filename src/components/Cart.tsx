import React from "react"
import { useStore } from "~/zustand"
import { CartOutlineIcon } from "./icons"

interface CartProps {}

const Cart: React.FC<CartProps> = () => {
  const toggleSidePane = useStore((state) => state.toggleSidePane)
  return (
    <>
      <button title="cart" className="cart" onClick={toggleSidePane}>
        <CartOutlineIcon aria-hidden="true" className="cart-icon" />
      </button>
      <style jsx>{`
        button {
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          color: var(--clr-white);
          background: var(--clr-amber10);
          font-size: 2rem;
        }
      `}</style>
    </>
  )
}

export default Cart
