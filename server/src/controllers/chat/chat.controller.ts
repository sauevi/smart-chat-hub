import { Controller, Get, Request } from '@nestjs/common'

@Controller('chat')
export class ChatController {
  @Get('profile')
  getChat(@Request() req): string {
    return req.user
  }
}
