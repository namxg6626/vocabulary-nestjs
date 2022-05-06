import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagResolver } from './tag.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { modelName, tagSchema } from './schema/tag.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: modelName, schema: tagSchema }]),
  ],
  providers: [TagService, TagResolver],
})
export class TagModule {}
