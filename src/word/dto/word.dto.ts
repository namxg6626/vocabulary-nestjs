import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsString } from 'class-validator';

@InputType()
export class SyncWordInput {
  @Field({ nullable: false })
  @IsString()
  rxId: string;

  @Field({ nullable: false })
  @IsString()
  word: string;

  @Field({ nullable: false })
  @IsString()
  meaning: string;

  @Field({ nullable: false })
  @IsBoolean()
  deleted: boolean; // rxdb push _deleted flag

  @Field({ nullable: false })
  @IsString()
  updatedAt: string;
}

@InputType()
export class FeedWordsInput {
  @Field(() => String)
  minUpdatedAt: string;

  @Field(() => Number)
  limit: number;
}
