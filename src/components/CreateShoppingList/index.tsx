import AddItemBanner from "./AddItemBanner"
import ComposeList from "./ComposeList"

interface CreateShoppingListProps {}

const CreateShoppingList: React.FC<CreateShoppingListProps> = ({}) => {
  return (
    <div className="wrapper">
      <div className="top">
        <AddItemBanner />
      </div>
      <div className="bottom">
        <ComposeList />
      </div>
      <style jsx>{`
        .wrapper {
          position: relative;
          display: flex;
          justify-content: space-between;
          flex-direction: column;
          height: 100%;
        }
        .top {
          padding: 4rem;
          padding-bottom: 0;
        }
        .bottom {
          flex-grow: 1;
        }
        @media (max-width: 768px) {
          .top {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  )
}

export default CreateShoppingList
