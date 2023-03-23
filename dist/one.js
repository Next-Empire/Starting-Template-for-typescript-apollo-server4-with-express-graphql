import { buildSchema } from "graphql";
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
export const typeDefs = buildSchema(`
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }

`);
//# sourceMappingURL=one.js.map