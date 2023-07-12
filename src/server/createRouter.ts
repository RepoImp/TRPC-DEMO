import { trpc } from "./utils/trpc"
import { userRouter } from "../server/routers/user.router"

export const appRouter = trpc.mergeRouters(
  userRouter
);

export type AppRouter = typeof appRouter;
