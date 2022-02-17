import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class UserResolver {
  @Query((type) => String)
  rootQuery() {
    return 'hello world';
  }
}
