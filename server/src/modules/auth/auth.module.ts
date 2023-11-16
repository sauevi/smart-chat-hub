import { Module } from '@nestjs/common'
import { AuthService } from '../../services/auth/auth.service'
import { UsersModule } from '../user/user.module'
import { PassportModule } from '@nestjs/passport'
import { LocalStrategy } from '../../strategy/auth/local.strategy'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from '../../constants/constants'
import { AuthController } from '../../controllers/auth/auth.controller'
import { JwtStrategy } from 'src/strategy/auth/jwt.strategy'

@Module({
  controllers: [AuthController],
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
