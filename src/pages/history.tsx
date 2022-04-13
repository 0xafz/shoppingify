import { Chip, IconButton, Stack, Paper } from "@mui/material"
import React from "react"
import Link from "next/link"
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
      <Paper
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "2rem",
          borderRadius: "1.2rem",
          "&:hover": {
            boxShadow: "var(--elevation8)",
          },
          cursor: "pointer",
        }}
        elevation={1}
      >
        <h3>{name}</h3>
        <Stack
          direction="row"
          spacing={3}
          sx={{ fontSize: "1.5rem" }}
          alignItems={"center"}
        >
          <Stack
            spacing={1}
            direction="row"
            alignItems={"center"}
            sx={{ color: "var(--clr-gray11)" }}
          >
            <CalendarIcon fontSize={"2rem"} />
            <span>{date}</span>
          </Stack>
          <div
            className={`status ${
              status === "completed" ? "completed" : "cancelled"
            }`}
          >
            {status}
          </div>
          <IconButton
            sx={{
              color: "var(--clr-amber10)",
              fontSize: "2rem",
              fontWeight: "700",
            }}
          >
            <ChevronRightIcon />
          </IconButton>
        </Stack>
        <style jsx>{`
          h3 {
            font-size: 1.6rem;
            line-height: 2rem;
            font-weight: 500;
          }
          .status {
            padding: 0.5rem;
            border-radius: 0.8rem;
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
        `}</style>
      </Paper>
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
        {items.map((item) => (
          <li key={item.id}>
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
      `}</style>
    </Layout>
  )
}

export default history
