import React from "react"

interface RightSidePaneProps {}

export const RightSidePane: React.FC<RightSidePaneProps> = ({}) => {
  return (
    <div className="right-sidepane">
      <style jsx>
        {`
          .right-sidepane {
            flex-basis: 30%;
            height: 100vh;
            background: var(--clr-lightorange);
          }
        `}
      </style>
    </div>
  )
}
