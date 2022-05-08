import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

@InputType()
export class ChangePasswordInput {
  @Field(() => String, { nullable: false })
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  oldPassword: string;

  @Field(() => String, { nullable: false })
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  newPassword: string;
}
