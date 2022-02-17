import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';
import { UserModel } from 'src/user/models/user.model';

@InputType()
export class SignInInput {
  @Field({ nullable: false })
  @IsEmail()
  email: string;

  @Field({ nullable: false })
  @IsString()
  password: string;
}

@ObjectType()
export class SignInResponse {
  @Field(() => String)
  token: string;

  @Field(() => UserModel)
  user: UserModel;
}
