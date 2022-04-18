import { ItemInList } from "~/types"
import ShoppingListItem from "./ListItem"

interface ShoppingListGroupProps {
  groupName: string
  items: Array<ItemInList>
  listType: string
}
const ShoppingListGroup: React.FC<ShoppingListGroupProps> = ({
  groupName,
  items,
  listType,
}) => {
  return (
    <div>
      <h3>{groupName}</h3>
      <ul>
        {items.map((item) => (
          <ShoppingListItem
            {...item}
            key={item.shoppingItemId}
            listType={listType}
          />
        ))}
      </ul>
      <style jsx>{`
        div {
          margin-top: 1rem;
        }
        ul {
          list-style: none;
          padding: 0;
        }
        h3 {
          font-size: 1.4rem;
          color: var(--clr-gray9);
        }
      `}</style>
    </div>
  )
}
export default ShoppingListGroup
