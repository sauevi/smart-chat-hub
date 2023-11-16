import { Module } from '@nestjs/common'
import { ChatController } from '../../controllers/chat/chat'

@Module({
  controllers: [ChatController],
})
export class ChatModule {}
