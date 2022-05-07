import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { GetCurrentUser } from 'src/auth/decorator/current-user.decorator';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { UserModel } from './models/user.model';
import { UserService } from './user.service';

@Resolver()
@UseGuards(JwtGuard)
export class UserResolver {
  constructor(public userService: UserService) {}

  @Query((type) => String)
  rootQuery() {
    return 'hello world';
  }

  @Query((type) => UserModel)
  me(@GetCurrentUser() user: any) {
    return this.userService.findById(user._id);
  }
}
