import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class UpdateProfileInput {
  @Field(() => String, { nullable: true })
  @IsString()
  @IsNotEmpty()
  username: string;

  @Field(() => String, { nullable: true })
  @IsEmail()
  email: string;
}
