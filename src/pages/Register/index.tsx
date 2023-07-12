import type { NextPage } from "next";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, ISignUp } from "../../common/validation/auth";
import { trpc } from "../../common/Utils/trpc";
import Textfield from "../../common/Textfield";
import { Msg } from "../../common/Utils/messages";
import Header from "../../common/Header";
import Loader from "../../common/loading";
import { toast } from "react-toastify";
import Toster from "../../common/Toster";

const SignUp: NextPage = () => {
  const router = useRouter();
  const { handleSubmit, control, reset } = useForm<ISignUp>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(signUpSchema),
  });
  const [open, setOpen] = useState<boolean>(false)
  const [load, setLoad] = useState(false)

  const { mutateAsync } = trpc.singUp.useMutation();
  const onSubmit = useCallback(
    async (data: ISignUp) => {
      try {
        setLoad(true)
        const result = await mutateAsync(data);
        if (result.status === 200) {
          setLoad(false)
          reset();
          router.push("/");
        }else {
          setLoad(false)
          toast.error(result.message);
        }
      } catch (err) {
        console.error(err);
      }
    },
    [mutateAsync, router, reset, toast]
  );

  return (
    <div>
      <Header title={Msg.HEADER_MESSAGE} />
      <main>
        <div className="screen">
          <div className="login text-style">
            <h2 >{Msg.SIGN_UP}</h2>
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
                  <Textfield
                    autoComplete="off"
                    label={Msg.EMAIL}
                    {...field}
                    error={error?.message}
                  />
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
                <button className="btn" type="submit">
                  {Msg.SIGN_UP}
                </button>
                <div className="signUp">
                  {Msg.ALREADY_USER} <span><Link href="/">{Msg.LOGIN}</Link></span>
                </div>
              </div>
            </form>
          </div>
        </div>
        <Loader load={load}/>
        <Toster />
      </main>
    </div>
  );
};

export default SignUp;
