import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsString } from 'class-validator';

@InputType()
export class SyncTagInput {
  @Field({ nullable: false })
  @IsString()
  rxId: string;

  @Field({ nullable: false })
  @IsString()
  name: string;

  @Field(() => [String], { nullable: false })
  @IsString({ each: true })
  wordIds: string[];

  @Field({ nullable: false })
  @IsBoolean()
  deleted: boolean;

  @Field({ nullable: false })
  @IsString()
  updatedAt: string;
}

@InputType()
export class FeedTagsInput {
  @Field(() => String)
  minUpdatedAt: string;

  @Field(() => Number)
  limit: number;
}
