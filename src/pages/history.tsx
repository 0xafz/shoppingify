import Link from "next/link"
import React from "react"
import { CalendarIcon, ChevronRightIcon } from "~/components/icons"
import Layout from "~/components/Layout"

const timelinedLists = [
  {
    when: "August 2020",
    lists: [
      {
        name: "List 1",
        date: "Mon 27.8.2020",
        status: "completed",
      },
      {
        name: "List 2",
        date: "Mon 27.8.2020",
        status: "completed",
      },
      {
        name: "List 2",
        date: "Mon 27.8.2020",
        status: "cancelled",
      },
    ],
  },
  {
    when: "Mar 2019",
    lists: [
      {
        name: "List 2",
        date: "Mon 27.8.2020",
        status: "completed",
      },
      {
        name: "List 2",
        date: "Mon 27.8.2020",
        status: "completed",
      },
    ],
  },
]
const ShoppingList = ({ name, date, status }: any) => {
  return (
    <Link href={"/list/1"}>
      <div className="s-list">
        <h3>{name}</h3>
        <div className="s-list__details">
          <div className="s-list__date">
            <CalendarIcon fontSize={"2rem"} />
            <span>{date}</span>
          </div>
          <div
            className={`status ${
              status === "completed" ? "completed" : "cancelled"
            }`}
          >
            {status}
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
            gap: 0.5em;
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
          .status {
            padding: 0.5em;
            border-radius: 0.8em;
            font-weight: 700;
          }
          .status.completed {
            color: var(--clr-sky10);
            border: 1px solid var(--clr-sky10);
          }
          .status.cancelled {
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

            h3 {
              font-size: 1.2em;
            }
            .s-list__details {
              font-size: 1.2rem;
            }
          }
        `}</style>
      </div>
    </Link>
  )
}
interface ShoppingListsGroupProps {
  groupName: string
  items: any[]
}
const ShoppingListsGroup = ({ groupName, items }: ShoppingListsGroupProps) => {
  return (
    <section>
      <h2>{groupName}</h2>
      <ul>
        {items.map((item, i) => (
          <li key={`${item.id}-${i}`}>
            <ShoppingList {...item} />
          </li>
        ))}
      </ul>
      <style jsx>{`
        section {
          margin-bottom: 4rem;
        }

        h2 {
          font-size: 1.2rem;
          font-weight: 500;
          margin: 1rem 0;
        }
        ul {
          list-style: none;
          padding: 0;
        }
        ul {
          display: flex;
          flex-direction: column;
          gap: 3rem;
        }
      `}</style>
    </section>
  )
}
interface historyProps {}

const history: React.FC<historyProps> = ({}) => {
  return (
    <Layout>
      <div className="wrapper">
        <header>
          <h1>Shopping history</h1>
        </header>
        <main>
          {timelinedLists.map((item) => (
            <ShoppingListsGroup
              groupName={item.when}
              items={item.lists}
              key={item.when}
            />
          ))}
        </main>
      </div>

      <style jsx>{`
        .wrapper {
          padding: 4rem;
        }
        main {
          margin-top: 3rem;
        }
        h1 {
          font-size: 2.5rem;
          font-weight: 500;
          flex-basis: 65%;
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

export default history
