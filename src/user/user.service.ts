import { ConflictException, Injectable } from '@nestjs/common';
import { modelName } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { UserModel } from './models/user.model';
import { Model } from 'mongoose';
import { GetUserDto } from './dto/get-user.dto';
import * as _ from 'lodash';
import * as bcrypt from 'bcrypt';
import { entirelyMatchString } from 'src/shared/utils/regex';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(modelName)
    private readonly User: Model<UserModel>,
  ) {}

  findById(id: string) {
    return this.User.findById(id);
  }

  async getUser(dto: GetUserDto) {
    return await this.User.find({ ...dto });
  }

  async createUser(email: string, password: string) {
    const exist = await this.User.findOne({
      email: entirelyMatchString(email),
    });
    if (!_.isEmpty(exist)) {
      throw new ConflictException('email is taken');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const defaultUsername = email.split('@')[0].replace(/\W/g, '');
    const newUser = await this.User.create({
      username: defaultUsername,
      email,
      password: hashedPassword,
    });
    return newUser;
  }

  async findOneByEmail(email: string) {
    return await this.User.findOne({ email: entirelyMatchString(email) });
  }
}
