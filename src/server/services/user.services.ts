import * as bcrypt from "bcrypt"

export const singUpService = async (input : any, ctx:any) => {
  input.password = await bcrypt.hashSync(input.password, 10)
  return (await ctx.prisma.users.create({
    data: input,
  }));
};
