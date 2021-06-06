import { Post } from "../entities/Post";
import { MyContext } from "src/types";
import { Ctx, Query, Resolver } from "type-graphql";

@Resolver()
export class PostResolver {
  @Query(() => [Post]) // the arrow function here specifies the type-graphql type
  posts(@Ctx() { em }: MyContext): Promise<Post[]> {
    // the function type sets the TypeScript type
    return em.find(Post, {});
  }
}
