import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { WordModel } from './models/word.model';
import { modelName } from './schemas/word.schema';
import { FeedWordsInput, SyncWordInput } from './dto/word.dto';

import * as dayjs from 'dayjs';

@Injectable()
export class WordService {
  constructor(
    @InjectModel(modelName)
    public Word: Model<WordModel>,
  ) {}

  findByRxId(rxId: string) {
    return this.Word.findOne({
      rxId,
    });
  }

  async feedWords(userId: string, dto: FeedWordsInput): Promise<WordModel[]> {
    const sortedWords = await this.Word.find({
      userId,
      updatedAt: {
        $gt: new Date(dto.minUpdatedAt),
      },
    })
      .sort('updatedAt')
      .limit(dto.limit);

    return sortedWords;
  }

  async syncWord(userId: string, dto: SyncWordInput): Promise<WordModel> {
    const word = await this.findByRxId(dto.rxId);
    const isExist = !!word;

    if (isExist) {
      await word.update({ ...dto, userId });
      word.updatedAt = dayjs(dto.updatedAt).toDate();
      return await word.save();
    } else {
      const newWord = new this.Word({
        ...dto,
        userId,
      });
      newWord.updatedAt = dayjs(dto.updatedAt).toDate();
      return await newWord.save();
    }
  }
}
