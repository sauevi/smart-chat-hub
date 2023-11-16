import { Module } from '@nestjs/common'
import { ChatModule } from './chat/chat.module'
import { AuthModule } from './auth/auth.module'
import { APP_GUARD } from '@nestjs/core'
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard'

@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  imports: [ChatModule, AuthModule],
})
export class AppModule {}
