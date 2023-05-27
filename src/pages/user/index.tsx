import Image from "next/image";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import Layout from "~/components/Layout";
import NotLoggedIn from "~/components/NotLoggedIn";
import useAsync from "~/hooks/useAsync";
import { cfetchPromise } from "~/lib/cfetch";
import { RedButton, CButton } from "~/mui-c/Button";
import { ConfirmDialog } from "~/mui-c/Dialog";
import { IUser } from "~/types";
import { useStore } from "~/zustand";
import { selectUser } from "~/zustand/userSlice";

const UserInfo = ({ user }: { user: IUser }) => {
  const deleteAccount = useCallback(() => {
    return cfetchPromise(`/api/users/${user.id}`, {
      method: "DELETE",
    });
  }, [user.id]);
  const logout = useCallback(() => {
    return cfetchPromise("/api/users/logout", {
      method: "post",
    });
  }, []);
  const router = useRouter();
  const clearStore = useStore((state) => state.clearStore);
  const [showConfirm, setShowConfirm] = useState(false);
  const { execute: deleteUser, isLoading: deleteLoading } = useAsync(
    deleteAccount,
    false
  );
  const { execute: exeLogout, isLoading: logoutLoading } = useAsync(
    logout,
    false
  );

  const handleLogout = async () => {
    try {
      await exeLogout();
    } catch (error) {
      console.error(error);
    } finally {
      // one way or other,just force clean session data
      sessionStorage.clear();
      clearStore();
      router.push("/user/sign-in");
    }
  };
  const handleDelete = async () => {
    try {
      await deleteUser();
      sessionStorage.clear();
      clearStore();
      router.push("/user/sign-in");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="avatar">
        <Image src={user.avatar} alt="avatar" width={100} height={100} />
      </div>
      <div className="details">
        <dl>
          {user &&
            Object.entries(user || {}).map(([key, value], i) => (
              <div key={i}>
                <dt>{key}</dt>
                <dd>{value}</dd>
              </div>
            ))}
        </dl>
      </div>
      <div>
        <CButton
          onClick={handleLogout}
          variant="contained"
          disabled={logoutLoading}
        >
          Logout
        </CButton>
      </div>

      <RedButton
        data-cy="deleteMyAccount"
        onClick={() => setShowConfirm(true)}
        sx={{ mt: "4rem" }}
        variant="contained"
        disabled={deleteLoading}
      >
        Delete My Account
      </RedButton>
      <ConfirmDialog
        open={showConfirm}
        onClose={() => setShowConfirm(false)}
        onYes={handleDelete}
        onYesLoading={deleteLoading}
      >
        Are you sure you want to <b>Delete</b> your account?
      </ConfirmDialog>
      <style jsx>{`
        .details {
          font-size: 1rem;
          margin: 2rem 0;
        }
        dl > div + div {
          margin-top: 2em;
        }
        dt {
          font-size: 1.5em;
          color: var(--clr-gray10);
        }
        dd {
          font-size: 2.5em;
          font-weight: 500;
          word-break: break-all;
        }
        @media (max-width: 768px) {
          .details {
            font-size: 0.9rem;
          }
          dd {
            font-size: 1.8em;
          }
        }
      `}</style>
    </>
  );
};
interface UserProps {}

const User: React.FC<UserProps> = ({}) => {
  const user = useStore(selectUser);
  return (
    <Layout>
      <div className="wrapper">
        {user ? <UserInfo user={user} /> : <NotLoggedIn />}
      </div>
      <style jsx>{`
        .wrapper {
          padding: 4rem;
          font-size: 1rem;
        }
        .login {
          font-size: 2rem;
          text-align: center;
          margin-top: 4rem;
        }
        @media (max-width: 1024px) {
          .wrapper {
            padding: 1rem;
          }
        }
      `}</style>
    </Layout>
  );
};

export default User;
