import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity() // declares this as a DB table
// use the class syntax as it is supported better by type-graphql
export class Post {
  @PrimaryKey()
  id!: number; // string is also supported

  @Property({ type: "date" })
  createdAt = new Date();

  @Property({ type: "date", onUpdate: () => new Date() }) // special hook that updates the date
  updatedAt = new Date();

  @Property({ type: "text" }) // annotation required to specify an attribute as a DB column
  title!: string;
}
