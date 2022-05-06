import { Document } from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TagModel extends Document {
  @Field(() => String)
  rxId: string;

  @Field(() => String)
  userId: string;

  @Field(() => String)
  name: string;

  @Field(() => [String])
  wordIds: string[];

  @Field(() => Boolean)
  deleted: boolean;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
