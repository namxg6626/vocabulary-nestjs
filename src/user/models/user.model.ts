import { Document } from 'mongoose';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class UserModel extends Document {
  @Field(() => String)
  username: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
