import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import Cart from "./Cart"
import {
  ChartOutlineIcon,
  ListBulletedIcon,
  PersonIcon,
  RefreshOutlineIcon,
} from "./icons"
import Image from "next/image"

interface MenuProps {}

export const Menu: React.FC<MenuProps> = ({}) => {
  const router = useRouter()
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname

  return (
    <nav className="menu" id="menu" aria-label="Menu">
      <Link href={"/"}>
        <a>
          <Image src="/logo.svg" alt="logo" width={50} height={50} />
        </a>
      </Link>
      <div className="main">
        <Link href={"/"}>
          <a
            aria-label={`items page, ${isActive("/") ? "current page" : ""}`}
            data-active={isActive("/")}
          >
            <ListBulletedIcon aria-hidden="true" />
          </a>
        </Link>
        <Link href={"/history"}>
          <a
            aria-label={`history page, ${
              isActive("/history") ? "current page" : ""
            }`}
            data-active={isActive("/history")}
          >
            <RefreshOutlineIcon aria-hidden="true" />
          </a>
        </Link>
        <Link href={"/stats"}>
          <a
            aria-label={`stats page, ${
              isActive("/stats") ? "current page" : ""
            }`}
            data-active={isActive("/stats")}
          >
            <ChartOutlineIcon aria-hidden="true" />
          </a>
        </Link>
        <Link href={"/user"}>
          <a
            aria-label={`user settings page, ${
              isActive("/user") ? "current page" : ""
            }`}
            data-active={isActive("/user")}
          >
            <PersonIcon aria-hidden="true" />
          </a>
        </Link>
      </div>
      <Cart />
      <style jsx>{`
        .menu {
          position: sticky;
          top: 0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          height: 100vh;
          width: 9.3rem;
          background: var(--clr-white);
          padding: 3rem 0;
        }
        .main {
          display: flex;
          flex-direction: inherit;
          justify-content: center;
          align-items: center;
          gap: 3.5rem;
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
          font-size: 3rem;
          color: var(--clr-black);
        }
        a {
          position: relative;
          display: flex;
          flex-direction: inherit;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 5rem;
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
          width: 5rem;
          height: 5rem;
        }
        .logo img {
          width: 100%;
          height: 100%;
        }
        @media (max-width: 768px) {
          .menu {
            width: 6rem;
            gap: 3rem;
          }
          a,
          button {
            height: 4rem;
            font-size: 2rem;
          }
          .logo,
          :global(.cart) {
            width: 4rem;
            height: 4rem;
          }
        }
      `}</style>
    </nav>
  )
}
