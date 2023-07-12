import type { NextPage } from "next";
import { useSession, signOut } from "next-auth/react";
import { Msg } from "../../common/Utils/messages";
import { requireAuth } from "../../common/Utils/requireAuth";

export const getServerSideProps = requireAuth(async (ctx) => {
  return { props: {} };
});

const Dashboard: NextPage = () => {
  const { data } = useSession();

  return (
    <div className="screen">
      <div className="login text-style" >
        <h1 className="text-5xl text-center font-bold leading-snug text-white-400">
          {Msg.LOGGED_IN}
        </h1>
        <p className="my-4 text-center leading-loose">
          <span className="welcometext">{Msg.WELCOME}</span> <span className="emailtext">{data?.user.email}</span>
        </p>
        <div className="text-center">
          <button
            className="btn"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            {Msg.LOGOUT}
          </button>
        </div>
      </div >
    </div>
  );
};

export default Dashboard;