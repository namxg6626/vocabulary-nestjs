import { ValidationPipe } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignInInput, SignInResponse } from './dto/signin.dto';
import { SignUpInput, SignUpResponse } from './dto/signup.dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => SignUpResponse)
  async signup(
    @Args('signUpInput', ValidationPipe) input: SignUpInput,
  ): Promise<SignUpResponse> {
    return await this.authService.signup(input);
  }

  @Mutation(() => SignInResponse)
  async signin(
    @Args('signInInput', ValidationPipe) input: SignInInput,
  ): Promise<SignInResponse> {
    return await this.authService.signin(input);
  }
}
