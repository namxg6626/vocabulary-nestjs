import { Document } from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class WordModel extends Document {
  @Field(() => String)
  rxId: string;

  @Field(() => String)
  userId: string;

  @Field(() => String)
  word: string;

  @Field(() => String)
  meaning: string;

  @Field(() => Boolean)
  deleted: boolean;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
