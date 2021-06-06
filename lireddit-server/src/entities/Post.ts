import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";

@ObjectType() // we need to this to be a type-graphql type as well
@Entity() // declares this as a DB table
// use the class syntax as it is supported better by type-graphql
export class Post {
  @Field()
  @PrimaryKey()
  id!: number; // string is also supported

  @Field(() => String)
  @Property({ type: "date" })
  createdAt = new Date();

  @Field(() => String)
  @Property({ type: "date", onUpdate: () => new Date() }) // special hook that updates the date
  updatedAt = new Date();

  @Field()
  @Property({ type: "text" }) // annotation required to specify an attribute as a DB column
  title!: string;
}
