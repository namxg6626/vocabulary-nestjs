import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { MongooseModule } from '@nestjs/mongoose';
import { Constants } from './shared/constants';
import { AuthModule } from './auth/auth.module';
import { WordModule } from './word/word.module';
import { TagModule } from './tag/tag.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: process.cwd() + './schema.gpl',
      sortSchema: true,
      driver: ApolloDriver,
      context: ({ req }) => ({ req }),
    }),
    MongooseModule.forRoot(Constants.MONGO_URI),
    UserModule,
    AuthModule,
    WordModule,
    TagModule,
  ],
})
export class AppModule {}
