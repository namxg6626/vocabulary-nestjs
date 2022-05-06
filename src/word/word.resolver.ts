import { UseGuards } from '@nestjs/common';
import { Args, Query, Mutation, Resolver } from '@nestjs/graphql';
import { GetCurrentUser } from 'src/auth/decorator/current-user.decorator';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { FeedWordsInput, SyncWordInput } from './dto/word.dto';
import { WordModel } from './models/word.model';
import { WordService } from './word.service';

@Resolver()
@UseGuards(JwtGuard)
export class WordResolver {
  constructor(public wordService: WordService) {}

  @Mutation((type) => WordModel)
  async syncWord(
    @GetCurrentUser()
    user: any,
    @Args({ name: 'word', type: () => SyncWordInput })
    input: SyncWordInput,
  ): Promise<WordModel> {
    return this.wordService.syncWord(user._id, input);
  }

  @Query((type) => [WordModel])
  async feedWords(
    @GetCurrentUser() user: any,
    @Args({ name: 'input', type: () => FeedWordsInput }) input: FeedWordsInput,
  ) {
    return this.wordService.feedWords(user._id, input);
  }
}
