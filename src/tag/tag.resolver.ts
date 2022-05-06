import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetCurrentUser } from 'src/auth/decorator/current-user.decorator';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { FeedTagsInput, SyncTagInput } from './dto/tag.dto';
import { TagModel } from './models/tag.model';
import { TagService } from './tag.service';

@Resolver()
@UseGuards(JwtGuard)
export class TagResolver {
  constructor(public tagService: TagService) {}

  @Mutation((type) => TagModel)
  syncTag(
    @GetCurrentUser()
    user: any,
    @Args({ name: 'tag', type: () => SyncTagInput })
    input: SyncTagInput,
  ): Promise<TagModel> {
    return this.tagService.syncTag(user._id, input);
  }

  @Query((type) => [TagModel])
  feedTags(
    @GetCurrentUser()
    user: any,
    @Args({ name: 'input', type: () => FeedTagsInput }) input: FeedTagsInput,
  ) {
    return this.tagService.feedTags(user._id, input);
  }
}
