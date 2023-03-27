import { Resolver, ObjectType, Field, Query } from "type-graphql";

@ObjectType()
class Person {
  @Field(() => String)
  name: string;

  @Field(() => Number)
  age: number;
}

@Resolver()
export class PersonResolver {
  @Query(() => Person)
  person() {
    return { name: "Alice", age: 30 };
  }
}
