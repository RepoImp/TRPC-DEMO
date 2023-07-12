import type { NextPage } from "next";
import Link from "next/link";
import { useCallback, useState } from "react";
import { signIn } from "next-auth/react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, ILogin } from "../../common/validation/auth";
import Textfield from "../../common/Textfield";
import { Msg } from "../../common/Utils/messages";
import Header from "../../common/Header";
import Loader from "../../common/loading";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Toster from "../../common/Toster";

const Login: NextPage = () => {
  const router = useRouter();
  const { handleSubmit, control, reset } = useForm<ILogin>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });
  const [open, setOpen] = useState<boolean>(false)
  const [load, setLoad] = useState(false)


  const onSubmit = useCallback(
    async (data: ILogin) => {
      try {
        setLoad(true)
        signIn("credentials", { ...data, redirect: false }).then(async (data) => {
          if(data?.ok){
            router.push("/Dashboard");
          } else {
            toast.error(Msg.INVALID_CREDENTIAL);
          }
        })
          .catch((e) => {
            toast.error(Msg.INVALID_CREDENTIAL);
          });
        setLoad(false)
        reset();
      } catch (err) {
        console.error(err);
      }
    },
    [reset]
  );

  return (
    <div>
      <Header title={Msg.HEADER_MESSAGE} />

      <main>
        <div className="screen">
          <div className="login text-style">
            <h2 >{Msg.LOGIN}</h2>
            <form
              onSubmit={handleSubmit(onSubmit)}
            >
              <Controller
                name="email"
                control={control}
                render={({
                  field,
                  fieldState: { error },
                }) => (
                  <>
                    <Textfield
                      autoComplete="off"
                      label={Msg.EMAIL}
                      {...field}
                      error={error?.message}
                    />
                  </>
                )}
              />

              <Controller
                name="password"
                control={control}
                render={({
                  field,
                  fieldState: { error },
                }) => (
                  <Textfield
                    autoComplete="off"
                    label={Msg.PASSWORD}
                    {...field}
                    error={error?.message}
                    onIconClick={() => setOpen(!open)}
                    isIcon={true}
                    open={open}
                    type={open ? "text" : "password"}
                  />
                )}
              />
              <div>
                <button className="btn" type="submit" disabled={load}>
                  {Msg.LOGIN}
                </button>
                <div className="signUp">
                  {Msg.NEED_ACCOUNT} <span><Link href="/Register">{Msg.SIGN_UP}</Link></span>
                </div>
              </div>
            </form>
          </div>
        </div>

        <Loader load={load} />
        <Toster />
      </main>
    </div>
  );
};

export default Login;
