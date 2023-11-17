import { Module } from '@nestjs/common'
import { ChatController } from '../../controllers/chat/chat.controller'

@Module({
  controllers: [ChatController],
})
export class ChatModule {}
