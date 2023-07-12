import { signUpInput, } from '../schema/user.schema';
import { singUpService } from '../services/user.services';
import { Msg } from "../../common/Utils/messages";
import { StatusCodes } from 'http-status-codes';

export const singUpController = async ({
  input,
  ctx
}: {
  input: signUpInput;
  ctx: any
}) => {
  try {

    let user = await ctx.prisma.users.findFirst({
      where: { email: input.email }
    })

    if (user) return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: Msg.EMAIL_EXIST,
    };

    user = await singUpService(input, ctx);

    return {
      status: StatusCodes.OK,
      data: {
        user,
      },
    };
  } catch (err: any) {
    console.log(err);
    return err;
  }
};


