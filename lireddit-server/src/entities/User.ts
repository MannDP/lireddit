import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { text } from "express";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class User {
  @Field()
  @PrimaryKey()
  id!: number;

  @Field(() => String)
  @Property({ type: "date" })
  createdAt = new Date();

  @Field(() => String)
  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt = new Date();

  @Field()
  @Property({ type: "text", unique: true })
  username!: string;

  // by ommitting the password field, GraphQL does not know about
  // but the @Property means MikroORM knows about it, and the DB column will exist
  @Property({ type: text })
  password!: string;
}
