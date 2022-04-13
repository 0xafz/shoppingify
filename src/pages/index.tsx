import { Button, InputAdornment, Paper } from "@mui/material"
import React from "react"
import { PlusIcon, SearchOutlineIcon } from "~/components/icons"
import CTextField from "~/mui-c/TextField"
import Layout from "../components/Layout"

const list = {
  name: "shopping list",
  status: "incomplete",
  items: {
    "Fruits and vegetables": [
      {
        id: 1,
        name: "Tomato",
      },
      {
        id: 2,
        name: "Apple",
      },
    ],
    "Meat and Fish": [
      {
        id: 3,
        name: "Chicken",
      },
    ],
    Beverages: [
      {
        id: 4,
        name: "Soda",
      },
    ],
  },
}

const ShoppingItem = ({ name }: { name: string }) => {
  return (
    <Paper
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        minWidth: "18rem",
        minHeight: "5rem",
        padding: "1rem",
        borderRadius: "1.2rem",
        maxWidth: "20rem",
      }}
    >
      <h3>{name}</h3>
      <Button
        variant="text"
        sx={{
          fontSize: "1.5rem",
          fontWeight: "500",
          color: "var(--clr-gray10)",
        }}
      >
        <PlusIcon />
      </Button>
      <style jsx>{`
        h3 {
          font-size: 1.6rem;
          font-weight: 500;
        }
      `}</style>
    </Paper>
  )
}
interface ItemListGroupProps {
  groupName: string
  items: any[]
}
const ShoppingItemListGroup = ({ groupName, items }: ItemListGroupProps) => {
  return (
    <section>
      <h2>{groupName}</h2>
      <ul>
        {items.map((item) => (
          <li>
            <ShoppingItem name={item.name} key={item.id} />
          </li>
        ))}
      </ul>
      <style jsx>{`
        h2 {
          font-size: 1.8rem;
          font-weight: 500;
          margin: 1rem 0;
        }
        ul {
          list-style: none;
          padding: 0;
        }
        ul {
          display: flex;
          gap: 4rem;
        }
        section {
          margin-bottom: 4rem;
        }
      `}</style>
    </section>
  )
}

const Blog = () => {
  return (
    <Layout>
      <div className="wrapper">
        <header className="flex-between">
          <h1>
            <span>Shoppingify</span> allows you take your shopping list wherever
            you go
          </h1>
          <CTextField
            placeholder="search item"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" style={{ fontSize: "2.5rem" }}>
                  <SearchOutlineIcon />
                </InputAdornment>
              ),
            }}
          />
        </header>
        <main>
          {Object.entries(list.items).map(([key, items]) => (
            <ShoppingItemListGroup groupName={key} items={items} key={key} />
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
        h1 span {
          color: var(--clr-amber10);
        }
      `}</style>
    </Layout>
  )
}

export default Blog
