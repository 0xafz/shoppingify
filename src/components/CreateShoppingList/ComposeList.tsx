import { useStore } from "~/zustand";
import CompleteCancelCTA from "./CompleteCancelCTA";
import ShoppingListGroup from "./ListGroup";
import SaveListNameForm from "./SaveListNameForm";

const ComposeList = () => {
  const currList = useStore((state) => state.currList);
  const currListItems = useStore((state) => state.currListItems);
  // const handleEditListName = () => {}
  if (!currList) return null;
  return (
    <div className="compose-list">
      <div className="compose-list__header">
        <h2>{currList && currList.name}</h2>
        {/* <button title="edit list name" onClick={handleEditListName}>
              <PencilOutlineIcon aria-hidden="true" />
            </button> */}
      </div>
      <div className="compose-list__body styled-scrollbars">
        {currListItems &&
          currList &&
          Object.entries(currListItems || {}).map(([category, items], i) => (
            <ShoppingListGroup
              groupName={category}
              items={items}
              key={`${category}-${i}`}
              listType={currList.status}
            />
          ))}
      </div>
      <div className="compose-list__footer">
        {currList && currList.status === "un-saved" ? (
          <SaveListNameForm />
        ) : (
          <CompleteCancelCTA />
        )}
      </div>

      <style jsx>{`
        .compose-list {
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 100%;
        }
        .compose-list__body {
          flex-grow: 1;
          overflow-y: scroll;
          padding: 0rem 4rem;
        }
        .compose-list__header {
          margin: 1rem 0;
          font-size: 2.4rem;
          padding: 2rem 4rem;
        }
        .compose-list__footer {
          width: 100%;
          height: 13rem;
          padding: 4rem;
          font-size: 1.5rem;
          background-color: var(--clr-white);
        }
        .compose-list__footer {
        }
        h2 {
          font-size: 2.4rem;
        }

        @media (max-width: 768px) {
          h2 {
            font-size: 1.5rem;
          }
          .compose-list__header {
            margin: 0;
          }
          .compose-list__header,
          .compose-list__body,
          .compose-list__footer {
            padding: 1.5rem;
          }
          .compose-list__footer {
            height: 8rem;
          }
        }
      `}</style>
    </div>
  );
};
export default ComposeList;
