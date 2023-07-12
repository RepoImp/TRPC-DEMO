import { httpBatchLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";

import type { AppRouter } from "../../server/createRouter"

export const trpc = createTRPCNext<AppRouter>({
  config({ ctx }) {
    return {
      links: [
        httpBatchLink({
          url: `http://localhost:${process.env.PORT ?? 3000}/api/trpc`,
        }),
      ],
    };
  },
  ssr: true,
});
