import { trpc } from "../utils/trpc";
import {
    signUpSchema,
} from "../schema/user.schema";
import {
    singUpController,
} from "../controllers/user.controller";

export const userRouter = trpc.router({
    singUp: trpc.procedure
        .input(signUpSchema)
        .mutation(({ input, ctx }) => singUpController({ input, ctx })),
});
