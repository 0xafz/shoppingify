import Link from "next/link";
import React from "react";

interface NotLoggedInProps {}

const NotLoggedIn: React.FC<NotLoggedInProps> = ({}) => {
  return (
    <div className="login">
      Please <Link href="/user/sign-in">login</Link>
      <style jsx>{`
        .login {
          font-size: 2rem;
          text-align: center;
          margin-top: 4rem;
        }
      `}</style>
    </div>
  );
};

export default NotLoggedIn;
