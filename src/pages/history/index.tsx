import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import {
  CalendarIcon,
  CheckCircleIcon,
  CrossCircleIcon,
  DeleteOutlineIcon,
  QuestionMarkCircled,
} from "~/components/icons";
import Layout from "~/components/Layout";
import NotLoggedIn from "~/components/NotLoggedIn";
import useAsync from "~/hooks/useAsync";
import { cfetchPromise } from "~/lib/cfetch";
import { RedButton, TextButton } from "~/mui-c/Button";
import { IShoppingList } from "~/types";
import { sortObjectByKey } from "~/utils/client";
import { useStore } from "~/zustand";
import { selectUser } from "~/zustand/userSlice";

const getStatusClass = (status: string) => {
  switch (status) {
    case "completed":
      return "completed";
    case "cancelled":
      return "cancelled";
    case "incomplete":
      return "incomplete";
    default:
      return "unknown";
  }
};
const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed":
      return <CheckCircleIcon color="var(--clr-green9)" aria-hidden="true" />;
    case "cancelled":
      return <CrossCircleIcon color="var(--clr-red9)" aria-hidden="true" />;
    default:
      return (
        <QuestionMarkCircled color="var(--clr-gray9)" aria-hidden="true" />
      );
  }
};
const ShoppingList = ({ name, createdAt, status, id }: IShoppingList) => {
  const dispatchList = useStore((state) => state.dispatchList);
  const [deletePopoverAnchorEl, setDeletePopoverAnchorEl] = useState(null);
  const deleteList = useCallback(() => {
    return cfetchPromise(`/api/lists/${id}`, {
      method: "DELETE",
    });
  }, [id]);
  const handleDeleteClick = (e: any) => {
    e.stopPropagation();
    setDeletePopoverAnchorEl(e.currentTarget);
  };
  const { execute: exeDelete, isLoading: deleteLoading } = useAsync(
    deleteList,
    false
  );
  const handleDelete = async () => {
    try {
      await exeDelete();
      dispatchList({
        type: "list:delete",
        payload: {
          id,
          createdAt,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };
  const showDeletePopover = Boolean(deletePopoverAnchorEl);
  return (
    <div
      className={`s-list ${deleteLoading ? "disabled" : ""}`}
      data-cy="shoppingList"
    >
      <Link href={`/history/list/${id}`} passHref legacyBehavior>
        <h3>{name}</h3>
      </Link>
      <div className="s-list__details">
        <div className="s-list__date">
          <CalendarIcon aria-hidden="true" />
          <time dateTime={createdAt}>
            {new Date(createdAt).toLocaleDateString()}
          </time>
        </div>
        <div className={`lg__status ${getStatusClass(status)}`}>{status}</div>
        <div className={`sm__status`} title={`${name} status: ${status}`}>
          {getStatusIcon(status)}
        </div>
        <IconButton onClick={handleDeleteClick} data-cy="delete-shopping-list">
          <DeleteOutlineIcon fontSize={"2.5rem"} />
        </IconButton>
      </div>
      <Popover
        open={showDeletePopover}
        anchorEl={deletePopoverAnchorEl}
        onClose={() => setDeletePopoverAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        data-cy="list-delete-popover"
      >
        <div className="popover-content">
          <strong>Confirm</strong>
          <TextButton
            sx={{ ml: "1rem" }}
            onClick={() => setDeletePopoverAnchorEl(null)}
            disabled={deleteLoading}
          >
            Cancel
          </TextButton>
          <RedButton
            variant="contained"
            sx={{ ml: "1rem" }}
            onClick={handleDelete}
            disabled={deleteLoading}
          >
            Delete
          </RedButton>
        </div>
      </Popover>
      <style jsx>{`
        .s-list {
          background: var(--clr-white);
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: box-shadow 0.3s ease;
          border-radius: 1.2rem;
          box-shadow: var(--elevation3);
          padding: 2rem;
          font-size: 1rem;
        }
        .s-list.disabled {
          pointer-events: none;
          opacity: 0.6;
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
          font-size: 2em;
          line-height: 2em;
          font-weight: 500;
          max-width: 50%;
          word-break: break-all;
          text-decoration: underline;
          cursor: pointer;
        }
        .lg__status {
          padding: 0.5em;
          border-radius: 0.8em;
          font-weight: 700;
        }
        .sm__status {
          display: none;
          font-size: 2rem;
        }
        .completed {
          color: var(--clr-green9);
          border: 1px solid var(--clr-green9);
        }
        .cancelled {
          color: var(--clr-red9);
          border: 1px solid var(--clr-red9);
        }
        .incomplete {
          color: var(--clr-gray9);
          border: 1px solid var(--clr-gray9);
        }
        .popover-content {
          font-size: 1.5rem;
          padding: 1rem;
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
            border: 0;
          }
          .lg__status {
            display: none;
          }
          h3 {
            font-size: 1.5em;
            line-height: 2em;
          }
          .s-list__details {
            font-size: 1.2rem;
          }
          svg {
            font-size: 1rem;
          }
          .s-list__date {
            display: none;
          }
          .popover-content {
            font-size: 1.2rem;
            padding: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
};
interface ShoppingListGroupProps {
  groupName: string;
  lists: IShoppingList[];
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
  );
};
const HistoryContent = () => {
  const listsGrouped = useStore((state) => state.listsGrouped);
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
  );
};
interface historyProps {}

const History: React.FC<historyProps> = ({}) => {
  const user = useStore(selectUser);
  const fetchShoppingLists = useStore((state) => state.fetchShoppingLists);
  useEffect(() => {
    fetchShoppingLists();
  });
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
  );
};

export default History;
