import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import Layout from "~/components/Layout"
import { RedButton } from "~/mui-c/Button"
import { IUser } from "~/types"
import { removeJwtTokens } from "~/utils/client/auth"
import { useStore } from "~/zustand"
import NotLoggedIn from "~/components/NotLoggedIn"

const UserInfo = ({ user }: { user: IUser }) => {
  const router = useRouter()
  const clearStore = useStore((state) => state.clearStore)
  const handleLogout = async () => {
    try {
      await fetch("/api/users/logout", {
        method: "POST",
      })
    } catch (error) {
      console.error(error)
    } finally {
      sessionStorage.clear()
      clearStore()
      removeJwtTokens()
      router.push("/user/sign-in")
    }
  }
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
      <RedButton onClick={handleLogout}>Logout</RedButton>
      <style jsx>{`
        .details {
          font-size: 1.5rem;
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
            font-size: 1rem;
          }
          dd {
            font-size: 1.8em;
          }
        }
      `}</style>
    </>
  )
}
interface UserProps {}

const User: React.FC<UserProps> = ({}) => {
  const user = useStore((state) => state.user)
  return (
    <Layout>
      <div className="wrapper">
        {user ? <UserInfo user={user} /> : <NotLoggedIn />}
      </div>
      <style jsx>{`
        .wrapper {
          padding: 4rem;
          font-size: 1.5rem;
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
  )
}

export default User
