import { Controller, Get } from '@nestjs/common'
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus'
import { Public } from 'src/decorators/setMetadata.decorator'

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private db: TypeOrmHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  @Public()
  checkLogIn() {
    return this.health.check([
      () => this.http.pingCheck('auth', 'http://localhost:8000/auth/log-in'),
      () => this.http.pingCheck('auth', 'http://localhost:8000/auth/sign-in'),
    ])
  }

  @Get('data-base')
  @HealthCheck()
  @Public()
  checkDataBase() {
    return this.health.check([
      () => this.db.pingCheck(process.env.DATA_BASE_NAME),
    ])
  }
}
