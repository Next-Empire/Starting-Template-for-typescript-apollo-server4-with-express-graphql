import { Resolver, Query } from "type-graphql";
import { Person } from "../schema";

@Resolver()
export class Resolvers {
  @Query(() => Person)
  person() {
    return { name: "Alice", age: 30 };
  }
}
