import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import Cart from "./Cart"
import { ChartOutlineIcon, ListBulletedIcon, RefreshOutlineIcon } from "./icons"

interface MenuProps {}

export const Menu: React.FC<MenuProps> = ({}) => {
  const router = useRouter()
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname

  return (
    <div className="menu">
      <button className="logo" title="logo">
        <img src="/logo.svg" alt="logo" />
      </button>
      <div className="main">
        <Link href={"/"}>
          <a aria-label="items" data-active={isActive("/")}>
            <ListBulletedIcon aria-hidden="true" />
          </a>
        </Link>
        <Link href={"/history"}>
          <a aria-label="history" data-active={isActive("/history")}>
            <RefreshOutlineIcon aria-hidden="true" />
          </a>
        </Link>
        <Link href={"/stats"}>
          <a aria-label="stats" data-active={isActive("/stats")}>
            <ChartOutlineIcon aria-hidden="true" />
          </a>
        </Link>
      </div>
      <Cart />
      <style jsx>{`
        .menu {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          height: 100vh;
          width: 9.3rem;
          padding: 3rem 0;
          background: var(--clr-white);
        }
        .main {
          display: flex;
          flex-direction: inherit;
          justify-content: center;
          align-items: center;
          gap: 3rem;
          width: 100%;
        }
        button,
        :global(button) {
          background: none;
          border: 0;
          cursor: pointer;
          padding: 0;
        }
        button,
        a {
          font-size: 2rem;
          color: var(--clr-black);
        }
        a {
          position: relative;
          display: flex;
          flex-direction: inherit;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 4rem;
        }
        a::after {
          content: "";
          position: absolute;
          inset: 0;
          border-left: 6px solid transparent;
        }
        a[data-active="true"]::after {
          border-left: 6px solid var(--clr-amber10);
        }
        .logo,
        :global(.cart) {
          width: 4rem;
          height: 4rem;
        }
        .logo img {
          width: 100%;
          height: 100%;
        }
        @media (max-width: 768px) {
          .menu {
            width: 6rem;
          }
        }
      `}</style>
    </div>
  )
}
