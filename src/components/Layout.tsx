import React, { ReactNode } from "react"
import { useStore } from "~/zustand"
import { Menu } from "./Menu"
import { RightSidePane } from "./RightSidePane"

type Props = {
  children: ReactNode
}

const Layout: React.FC<Props> = (props) => {
  const showSidePane = useStore((state) => state.showSidePane)
  return (
    <div {...props} className="layout">
      <Menu />
      <div className="container">{props.children}</div>
      {showSidePane && <RightSidePane />}
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
