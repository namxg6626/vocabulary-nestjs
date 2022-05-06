import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { Constants } from 'src/shared/constants';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: Constants.JWT_SECRET,
    }),
    PassportModule,
  ],
  providers: [AuthResolver, JwtStrategy, AuthService],
})
export class AuthModule {}
