import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { Constants } from 'src/shared/constants';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: Constants.JWT_SECRET,
    }),
  ],
  providers: [AuthResolver, JwtStrategy, AuthService],
})
export class AuthModule {}
