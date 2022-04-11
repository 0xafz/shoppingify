import React, { ReactNode } from "react"
import { Menu } from "./Menu"
import { RightSidePane } from "./RightSidePane"

type Props = {
  children: ReactNode
}

const Layout: React.FC<Props> = (props) => (
  <div {...props} className="layout">
    <Menu />
    <div className="container">{props.children}</div>
    <RightSidePane />
    <style jsx>
      {`
        .layout {
          display: flex;
        }
        .container {
          flex-grow: 1;
        }
      `}
    </style>
  </div>
)

export default Layout
