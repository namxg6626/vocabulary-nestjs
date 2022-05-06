import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { modelName, wordSchema } from './schemas/word.schema';
import { WordResolver } from './word.resolver';
import { WordService } from './word.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: modelName, schema: wordSchema }]),
  ],
  providers: [WordResolver, WordService],
})
export class WordModule {}
