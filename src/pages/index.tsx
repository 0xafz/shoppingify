import { IconButton, InputAdornment } from "@mui/material"
import React, { useEffect, useState } from "react"
import { PlusIcon, SearchOutlineIcon } from "~/components/icons"
import CTextField from "~/mui-c/TextField"
import { useStore } from "~/zustand"
import Layout from "../components/Layout"
import { ShoppingItemSlice } from "~/zustand/shoppingItemSlice"
import { IShoppingItem } from "~/types"
import NotLoggedIn from "~/components/NotLoggedIn"
import useDebounce from "~/hooks/useDebounce"

const ShoppingItem = ({ item }: { item: IShoppingItem }) => {
  const dispatchDrawer = useStore((state) => state.dispatchDrawer)
  const dispatchList = useStore((state) => state.dispatchList)

  const handleAdd = () => {
    dispatchDrawer({
      type: "drawer:set",
      payload: "create-list",
    })
    dispatchList({
      type: "list:add-item",
      payload: {
        shoppingItemId: item.id,
        itemCategory: item.category,
        itemName: item.name,
        quantity: 1,
      },
    })
  }
  return (
    <div className="s-item">
      <button
        className="s-item__name"
        onClick={() =>
          dispatchDrawer({ type: "drawer:set-info-item", payload: item })
        }
      >
        <h3>{item.name}</h3>
      </button>
      <IconButton
        sx={{
          fontSize: "2rem",
          fontWeight: "700",
          color: "var(--clr-gray10)",
        }}
        onClick={handleAdd}
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
        .s-item__name {
          flex-grow: 1;
          text-align: left;
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
  items: IShoppingItem[]
}
const ShoppingItemsGroup = ({ groupName, items }: ShoppingItemsGroupProps) => {
  return (
    <section>
      <h2>{groupName}</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <ShoppingItem item={item} />
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
const HomeContent = () => {
  const [searchKey, setSearchKey] = useState("")
  const debouncedSearchKey = useDebounce<string>(searchKey, 500)
  const itemsGrouped = useStore((state) => state.itemsGrouped)
  const [filtered, setFiltered] = useState(itemsGrouped)

  useEffect(() => {
    setFiltered(itemsGrouped)
  }, [itemsGrouped])

  const search = (
    items: ShoppingItemSlice["itemsGrouped"],
    searchKey: string
  ) => {
    setFiltered(
      Object.entries(items).reduce((acc, [category, items]) => {
        const filteredCategoryItems = items.filter(
          (item) => item.name.toLowerCase().search(searchKey) !== -1
        )
        if (filteredCategoryItems.length !== 0) {
          acc[category] = filteredCategoryItems
        }
        return acc
      }, {})
    )
  }

  const handleSearchKeyChange = (e: any) => {
    setSearchKey(e.target.value.toLowerCase())
  }
  useEffect(() => {
    if (debouncedSearchKey) {
      search(itemsGrouped, debouncedSearchKey)
      return
    }
    setFiltered(itemsGrouped)
  }, [debouncedSearchKey])

  return (
    <>
      <header className="flex-between">
        <h1>
          <span>Shoppingify</span> allows you take your shopping list wherever
          you go
        </h1>
        <CTextField
          placeholder="search item"
          sx={{
            minWidth: "35rem",
          }}
          value={searchKey}
          onChange={handleSearchKeyChange}
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
          Object.entries(filtered || {}).map(([category, items], i) => (
            <ShoppingItemsGroup
              groupName={category}
              items={items}
              key={`${category}-${i}`}
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
    </>
  )
}

const Home = () => {
  const user = useStore((state) => state.user)
  const fetchShoppingItems = useStore((state) => state.fetchShoppingItems)

  useEffect(() => {
    fetchShoppingItems()
  }, [fetchShoppingItems])

  return (
    <Layout>
      <div className="wrapper">{user ? <HomeContent /> : <NotLoggedIn />}</div>
      <style jsx>{`
        .wrapper {
          padding: 4rem;
        }

        @media (max-width: 1024px) {
          .wrapper {
            padding: 1rem;
          }
        }
      `}</style>
    </Layout>
  )
}

export default Home
