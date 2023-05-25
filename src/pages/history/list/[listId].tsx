import Link from "next/link"
import { useRouter } from "next/router"
import React, { useCallback } from "react"
import { CalendarIcon } from "~/components/icons"
import Layout from "~/components/Layout"
import useAsync from "~/hooks/useAsync"
import { cfetchPromise } from "~/lib/cfetch"
import { ItemInList, ShoppingListWithItems } from "~/types"
import { groupBy } from "~/utils/client"

interface ListInfoProps {}
interface ListInfoGroupProps {
  items: ItemInList[]
  groupName: string
}
const ListInfoGroup = ({ items, groupName }: ListInfoGroupProps) => {
  return (
    <div className="wrapper">
      <h2>{groupName}</h2>
      <ul>
        {items.map((item) => (
          <li key={item.shoppingItemId}>
            <span className="name">{item.itemName}</span>
            <span className="quantity">{item.quantity} pcs</span>
          </li>
        ))}
      </ul>
      <style jsx>{`
        .wrapper {
          font-size: 1rem;
          margin-bottom: 3rem;
        }
        h2 {
          color: var(--clr-gray12);
          font-size: 1.8em;
          line-height: 2.25em;
        }
        ul {
          list-style: none;
          display: flex;
          flex-flow: row wrap;
          gap: 4rem;
          padding: 0;
        }
        li {
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
        .name {
          font-size: 1.6em;
          line-height: 2em;
        }
        .quantity {
          color: var(--clr-amber10);
          font-size: 1.6rem;
          line-height: 1.5rem;
          font-weigth: 500;
        }
        @media (max-width: 768px) {
          ul {
            gap: 2rem;
          }
        }
        @media (max-width: 640px) {
          .s-item {
            min-width: 13rem;
            max-width: 14rem;
          }
          h2 {
            font-size: 1.6rem;
          }
        }
      `}</style>
    </div>
  )
}
const ListInfo: React.FC<ListInfoProps> = ({}) => {
  const { query } = useRouter()

  const fetchList = useCallback(async () => {
    return cfetchPromise<ShoppingListWithItems>(`/api/lists/${query.listId}`, {
      method: "GET",
    })
  }, [query.listId])
  const { error, isLoading, data } = useAsync(fetchList, true)
  return (
    <Layout>
      <div className="wrapper">
        <Link href={"/history"} className="back-link">
          &#8656; back
        </Link>
        <main>
          {isLoading && <p className="loading">loading...</p>}
          {error && <p className="error">{error}</p>}
          {!isLoading && !error && data && (
            <>
              <h1>{data.name}</h1>
              <div className="s-list__date">
                <CalendarIcon aria-hidden="true" />
                <time dateTime={data.createdAt}>
                  {new Date(data.createdAt).toLocaleDateString()}
                </time>
              </div>
              {Object.entries(
                groupBy<ItemInList>(data.shoppingItems, "itemCategory")
              ).map(([category, items]) => (
                <ListInfoGroup
                  items={items}
                  groupName={category}
                  key={category}
                />
              ))}
            </>
          )}
        </main>
      </div>
      <style jsx>{`
        .wrapper {
          padding: 4rem;
          font-size: 1.6rem;
        }
        .s-list__date {
          display: flex;
          align-items: center;
          gap: 1rem;
          color: var(--clr-gray9);
          margin-bottom: 3rem;
        }
        h1 {
          font-size: 2.5rem;
          font-weight: 700;
          line-height: 3rem;
          margin: 4rem 0 1rem;
        }
        @media (max-width: 1024px) {
          .wrapper {
            padding: 1rem;
          }
        }
        .loading {
          display: flex;
          justify-content: center;
          align-items; center;
        }
      `}</style>
    </Layout>
  )
}

export default ListInfo
