import { ConflictException, Injectable } from '@nestjs/common';
import { modelName } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { UserModel } from './models/user.model';
import { Model } from 'mongoose';
import { GetUserDto } from './dto/get-user.dto';
import * as _ from 'lodash';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(modelName)
    private readonly User: Model<UserModel>,
  ) {}

  async getUser(dto: GetUserDto) {
    return await this.User.find({ ...dto });
  }

  async createUser(email: string, password: string) {
    const exist = await this.User.findOne({ email });
    if (!_.isEmpty(exist)) {
      throw new ConflictException('email is taken');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const defaultUsername = email.replace(/[\W]/g, '');
    const newUser = await this.User.create({
      username: defaultUsername,
      email,
      password: hashedPassword,
    });
    return newUser;
  }

  async findOneByEmail(email: string) {
    return await this.User.findOne({ email });
  }
}
