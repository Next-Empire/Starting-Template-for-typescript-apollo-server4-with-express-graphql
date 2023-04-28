import { QueryResolvers } from "../__generated__/resolvers-types";
// Use the generated `QueryResolvers` type to type check our queries!
const queries: QueryResolvers = {
  Query: {
    userProfile: async (_: number, __: number, { req, user }: any) => {},
  },

  //redirect user incase user visits the url after once the user is being loged in
};

export default queries;
