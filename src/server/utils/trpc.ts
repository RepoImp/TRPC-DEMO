import { initTRPC, TRPCError } from "@trpc/server";
import { IContext } from "../createContext";

export const trpc = initTRPC.context<IContext>().create({});