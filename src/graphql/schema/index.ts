import { ObjectType, Field, Query } from "type-graphql";

@ObjectType()
export class Person {
  @Field(() => String)
  name: string;

  @Field(() => Number)
  age: number;
}
