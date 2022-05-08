import { UseGuards, ValidationPipe } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetCurrentUser } from 'src/auth/decorator/current-user.decorator';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { ChangePasswordInput } from './dto/change-password.dto';
import { UpdateProfileInput } from './dto/update-profile.dto';
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

  @Mutation((type) => UserModel)
  updateProfile(
    @GetCurrentUser()
    user: any,
    @Args('input', ValidationPipe) input: UpdateProfileInput,
  ): Promise<UserModel> {
    return this.userService.updateById(user._id, input);
  }

  @Mutation((type) => UserModel)
  changePassword(
    @GetCurrentUser()
    user: any,
    @Args('input', ValidationPipe) input: ChangePasswordInput,
  ): Promise<UserModel> {
    return this.userService.changePassword(user._id, input);
  }
}
