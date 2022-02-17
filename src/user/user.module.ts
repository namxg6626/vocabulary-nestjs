import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { modelName, userSchema } from './schemas/user.schema';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: modelName, schema: userSchema }]),
  ],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
