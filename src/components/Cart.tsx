import React from "react";
import { useStore } from "~/zustand";
import { CartOutlineIcon } from "./icons";

interface CartProps {}

const Cart: React.FC<CartProps> = () => {
  const dispatchDrawer = useStore((state) => state.dispatchDrawer);
  return (
    <>
      <button
        data-cy="toggle-drawer"
        title="cart"
        className="cart"
        onClick={() => dispatchDrawer({ type: "drawer:toggle" })}
        aria-label="toggle drawer"
      >
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
  );
};

export default Cart;
