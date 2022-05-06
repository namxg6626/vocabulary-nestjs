import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FeedTagsInput, SyncTagInput } from './dto/tag.dto';
import { TagModel } from './models/tag.model';
import { modelName } from './schema/tag.schema';
import * as dayjs from 'dayjs';

@Injectable()
export class TagService {
  constructor(
    @InjectModel(modelName)
    public Tag: Model<TagModel>,
  ) {}

  findByRxId(rxId: string) {
    return this.Tag.findOne({
      rxId,
    });
  }

  async feedTags(userId: string, dto: FeedTagsInput): Promise<TagModel[]> {
    const sortedTags = await this.Tag.find({
      userId,
      updatedAt: {
        $gt: new Date(dto.minUpdatedAt),
      },
    })
      .sort('updatedAt')
      .limit(dto.limit);

    return sortedTags;
  }

  async syncTag(userId: string, dto: SyncTagInput): Promise<TagModel> {
    const tag = await this.findByRxId(dto.rxId);
    const isExist = !!tag;

    if (isExist) {
      await tag.updateOne({ ...dto, userId });
      tag.updatedAt = dayjs(dto.updatedAt).toDate();
      return await tag.save();
    } else {
      const newTag = new this.Tag({
        ...dto,
        userId,
      });
      newTag.updatedAt = dayjs(dto.updatedAt).toDate();
      return await newTag.save();
    }
  }
}
