import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Constants } from 'src/shared/constants';
import { UserService } from 'src/user/user.service';
import { SignInInput, SignInResponse } from './dto/signin.dto';
import { SignUpInput, SignUpResponse } from './dto/signup.dto';
import * as _ from 'lodash';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async signup(dto: SignUpInput): Promise<SignUpResponse> {
    const newUser = await this.userService.createUser(dto.email, dto.password);
    const token = await this.jwtService.signAsync(newUser.toObject(), {
      secret: Constants.JWT_SECRET,
    });

    return {
      token,
      user: newUser,
    };
  }

  async signin(dto: SignInInput): Promise<SignInResponse> {
    const user = await this.userService.findOneByEmail(dto.email);
    if (_.isEmpty(user)) {
      throw new BadRequestException("email doesn't exist");
    }
    const isMatched = await bcrypt.compare(dto.password, user.password);
    if (!isMatched) {
      throw new BadRequestException('wrong password');
    }
    const token = await this.jwtService.signAsync(user.toObject(), {
      secret: Constants.JWT_SECRET,
    });

    return {
      user,
      token,
    };
  }
}
