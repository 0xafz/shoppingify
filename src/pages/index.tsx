import { IconButton, InputAdornment } from "@mui/material"
import React, { useCallback, useEffect, useState } from "react"
import { PlusIcon, SearchOutlineIcon } from "~/components/icons"
import CTextField from "~/mui-c/TextField"
import { useStore } from "~/zustand"
import Layout from "../components/Layout"
import theme from "~/lib/mui-theme"
import { debounce } from "~/utils/client"
import { ShoppingItemSlice } from "~/zustand/shoppingItemSlice"

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
  const setSidePaneType = useStore((state) => state.setSidePaneType)
  return (
    <div className="s-item">
      <button onClick={() => setSidePaneType("item-info")}>
        <h3>{name}</h3>
      </button>
      <IconButton
        sx={{
          fontSize: "2rem",
          fontWeight: "700",
          color: "var(--clr-gray10)",
        }}
      >
        <PlusIcon />
      </IconButton>
      <style jsx>{`
        .s-item {
          background: var(--clr-white);
          display: flex;
          align-items: center;
          justify-content: space-between;
          min-width: 18rem;
          max-width: 20rem;
          min-height: 5rem;
          padding: 1rem;
          border-radius: 1.2rem;
          box-shadow: var(--elevation3);
        }
        h3 {
          font-size: 1.6rem;
          font-weight: 500;
        }
        @media (max-width: 640px) {
          .s-item {
            min-width: 13rem;
            max-width: 14rem;
          }
          h3 {
            font-size: 1.4rem;
          }
        }
      `}</style>
    </div>
  )
}
interface ShoppingItemsGroupProps {
  groupName: string
  items: any[]
}
const ShoppingItemsGroup = ({ groupName, items }: ShoppingItemsGroupProps) => {
  return (
    <section>
      <h2>{groupName}</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <ShoppingItem name={item.name} />
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
          flex-flow: row wrap;
          gap: 4rem;
        }
        section {
          margin-bottom: 4rem;
        }
        @media (max-width: 768px) {
          ul {
            gap: 2rem;
          }
        }
      `}</style>
    </section>
  )
}

const Home = () => {
  const items = useStore((state) => state.items)
  const fetchShoppingItems = useStore((state) => state.fetchShoppingItems)
  const [search, setSearch] = useState("")
  const [filtered, setFiltered] = useState(items)

  useEffect(() => {
    fetchShoppingItems()
  }, [])

  const debouncedFilter = useCallback(
    debounce((items: ShoppingItemSlice["items"], search: string) => {
      setFiltered(
        Object.entries(items).reduce((acc, [category, items]) => {
          const filteredCategoryItems = items.filter(
            (item) => item.name.search(new RegExp(search, "ig")) !== -1
          )
          if (filteredCategoryItems.length !== 0) {
            acc[category] = filteredCategoryItems
          }
          return acc
        }, {})
      )
    }, 400),
    []
  )
  const handleSearchChange = (e: any) => {
    setSearch(e.target.value)
  }
  useEffect(() => {
    debouncedFilter(items, search)
  }, [search])

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
            sx={{
              flexBasis: "30%",
              maxWidth: "40rem",
              minWidth: "30rem",
              [theme.breakpoints.down("md")]: {
                minWidth: "25rem",
                fontSize: "1rem",
              },
            }}
            value={search}
            onChange={handleSearchChange}
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
          {filtered &&
            Object.entries(filtered || {}).map(([key, value], i) => (
              <ShoppingItemsGroup
                groupName={key}
                items={value}
                key={`${key}-${i}`}
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
        h1 span {
          color: var(--clr-amber10);
        }
        @media (max-width: 1024px) {
          .wrapper {
            padding: 1rem;
          }
          h1 {
            display: none;
          }
        }
      `}</style>
    </Layout>
  )
}

export default Home
