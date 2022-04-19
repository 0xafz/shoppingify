import Link from "next/link"
import React, { useEffect } from "react"
import {
  CalendarIcon,
  CheckCircleIcon,
  ChevronRightIcon,
  CrossCircleIcon,
} from "~/components/icons"
import Layout from "~/components/Layout"
import NotLoggedIn from "~/components/NotLoggedIn"
import { IShoppingList } from "~/types"
import { sortObjectByKey } from "~/utils/client"
import { useStore } from "~/zustand"

const ShoppingList = ({ name, createdAt, status }: IShoppingList) => {
  return (
    <Link href={"/list/1"}>
      <div className="s-list">
        <h3>{name}</h3>
        <div className="s-list__details">
          <div className="s-list__date">
            <CalendarIcon />
            <span>{new Date(createdAt).toLocaleDateString()}</span>
          </div>
          <div
            className={`lg__status ${
              status === "completed" ? "completed" : "cancelled"
            }`}
          >
            {status}
          </div>
          <div
            className={`sm__status ${
              status === "completed" ? "completed" : "cancelled"
            }`}
            title={`${name} ${status}`}
          >
            {status === "completed" ? (
              <CheckCircleIcon color="var(--clr-green9)" />
            ) : (
              <CrossCircleIcon color="var(--clr-red9)" />
            )}
          </div>
          <button>
            <ChevronRightIcon />
          </button>
        </div>
        <style jsx>{`
          .s-list {
            background: var(--clr-white);
            display: flex;
            align-items: center;
            justify-content: space-between;
            transition: box-shadow 0.3s ease;
            border-radius: 1.2rem;
            box-shadow: var(--elevation3);
            cursor: pointer;
            padding: 2rem;
            font-size: 1rem;
          }
          .s-list:hover {
            box-shadow: var(--elevation8);
          }
          .s-list__date {
            color: var(--clr-gray11);
            gap: 0.3rem;
          }
          .s-list__date svg {
            font-size: 1.4rem;
          }
          .s-list__details,
          .s-list__date {
            display: flex;
            align-items: center;
          }
          .s-list__details {
            gap: 1em;
            font-size: 1.5rem;
          }
          button {
            font-size: 2em;
            font-weight: 700;
            color: var(--clr-amber10);
          }
          h3 {
            font-size: 1.6em;
            line-height: 2em;
            font-weight: 500;
          }
          .lg__status {
            padding: 0.5em;
            border-radius: 0.8em;
            font-weight: 700;
          }
          .sm__status {
            display: none;
            font-size: 1.4rem;
          }
          .completed {
            color: var(--clr-green9);
            border: 1px solid var(--clr-green9);
          }
          .cancelled {
            color: var(--clr-red9);
            border: 1px solid var(--clr-red9);
          }
          @media (max-width: 768px) {
            button {
              display: none;
            }
            .s-list {
              padding: 1em;
            }

            .sm__status {
              display: inline-block;
            }
            .lg__status {
              display: none;
            }
            h3 {
              font-size: 1.2em;
            }
            .s-list__details {
              font-size: 1.2rem;
            }
            svg {
              font-size: 1rem;
            }
          }
        `}</style>
      </div>
    </Link>
  )
}
interface ShoppingListGroupProps {
  groupName: string
  lists: IShoppingList[]
}
const ShoppingListGroup = ({ groupName, lists }: ShoppingListGroupProps) => {
  return (
    <section>
      <h2>{groupName}</h2>
      <ul>
        {lists.map((list, i) => (
          <li key={`${list.id}-${i}`}>
            <ShoppingList {...list} />
          </li>
        ))}
      </ul>
      <style jsx>{`
        section {
          margin-bottom: 5rem;
        }

        h2 {
          font-size: 1.4rem;
          font-weight: 500;
          margin: 1rem 0;
        }
        ul {
          list-style: none;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 3rem;
        }
      `}</style>
    </section>
  )
}
const HistoryContent = () => {
  const listsGrouped = useStore((state) => state.listsGrouped)
  return (
    <>
      <header>
        <h1>Shopping history</h1>
      </header>
      <main>
        {listsGrouped &&
          sortObjectByKey(listsGrouped).map(([groupName, lists]) => (
            <ShoppingListGroup
              groupName={groupName}
              lists={lists}
              key={groupName}
            />
          ))}
      </main>
      <style jsx>{`
        main {
          margin-top: 3rem;
        }
        h1 {
          font-size: 2.5rem;
          font-weight: 500;
          flex-basis: 65%;
        }
      `}</style>
    </>
  )
}
interface historyProps {}

const History: React.FC<historyProps> = ({}) => {
  const user = useStore((state) => state.user)
  const fetchShoppingLists = useStore((state) => state.fetchShoppingLists)
  useEffect(() => {
    fetchShoppingLists()
  })
  return (
    <Layout>
      <div className="wrapper">
        {user ? <HistoryContent /> : <NotLoggedIn />}
      </div>

      <style jsx>{`
        .wrapper {
          padding: 4rem;
        }
        @media (max-width: 768px) {
          .wrapper {
            padding: 1.5rem;
          }
        }
      `}</style>
    </Layout>
  )
}

export default History
