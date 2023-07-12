import { object, string, TypeOf, z } from 'zod';
import { Msg } from "../../common/Utils/messages";

export const signUpSchema = object({
  email: string({
    required_error: Msg.EMAIL_REQUIRED,
  }),
  password: string({
    required_error: Msg.PASSWORD_REQUIRED,
  }),
});

export type signUpInput = TypeOf<typeof signUpSchema>;


