import React, { ReactNode } from "react"
import { useStore } from "~/zustand"
import { Menu } from "./Menu"
import RightSideDrawer from "./RightSideDrawer"

type Props = {
  children: ReactNode
}

const Layout: React.FC<Props> = (props) => {
  const showRightSideDrawer = useStore((state) => state.showRightSideDrawer)
  return (
    <div {...props} className="layout">
      <a href="#content" className="sr-text skip-link">
        skip to Main content
      </a>
      <Menu />
      {showRightSideDrawer && (
        <a href="#right-side-drawer" className="sr-text skip-link">
          Next Main content,press enter to skip to drawer
        </a>
      )}
      <div className="container" id="content" aria-label="Main Content">
        {props.children}
      </div>
      <a href="#menu" className="sr-text skip-link">
        Next Main content, press enter to skip to menu
      </a>
      {showRightSideDrawer && <RightSideDrawer />}
      <style jsx>
        {`
          .layout {
            display: flex;
          }
          .container {
            flex-grow: 1;
            max-width: calc(100% - 40rem - 9.3rem);
          }
          @media (max-width: 1024px) {
            .container {
              max-width: calc(100% - 9.3rem);
            }
          }
          @media (max-width: 768px) {
            .container {
              max-width: calc(100% - 6rem);
            }
          }
        `}
      </style>
    </div>
  )
}

export default Layout
