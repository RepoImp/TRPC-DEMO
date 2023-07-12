import type { NextPage } from "next";
import Login from "./Login"
import { useRouter } from "next/router";
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";
import Loader from "../common/loading";

const Main: NextPage = () => {
  const { data } = useSession();
  const router = useRouter();
  const [load, setLoad] = useState(true)

  useEffect(() => {
    if (data) {
      router.push("/Dashboard");
      setLoad(false)
    } else {
      setLoad(false)
    }
  }, [data])
  return (
    <>
      {load && <Loader load={load} />}
      {(data === null && !load) && <Login />}
    </>
  );
};

export default Main;
