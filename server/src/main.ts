import { NestFactory, Reflector } from '@nestjs/core'
import { AppModule } from './modules/app.module'
import * as cookieParser from 'cookie-parser'
import { ValidationPipe } from '@nestjs/common'
import * as dotenv from 'dotenv'
import { JwtAuthGuard } from './guard/jwt-auth.guard'

dotenv.config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalGuards(new JwtAuthGuard(new Reflector()))

  app.use(cookieParser())

  await app.listen(8000)
}

bootstrap()
