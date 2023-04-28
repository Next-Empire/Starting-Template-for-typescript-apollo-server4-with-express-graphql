import { MutationResolvers } from "../__generated__/resolvers-types.js";

// Use the generated `MutationResolvers` type to type check our mutations!
const mutations: MutationResolvers = {
  Mutation: {
    login: async (_: any, { email, password }: any, { req }: any) => {},
  },
};

export default mutations;
