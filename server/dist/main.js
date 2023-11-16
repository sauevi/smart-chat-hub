"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./modules/app.module");
const cookieParser = require("cookie-parser");
const common_1 = require("@nestjs/common");
const dotenv = require("dotenv");
const jwt_auth_guard_1 = require("./guard/jwt-auth.guard");
dotenv.config();
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.useGlobalGuards(new jwt_auth_guard_1.JwtAuthGuard(new core_1.Reflector()));
    app.use(cookieParser());
    await app.listen(8000);
}
bootstrap();
//# sourceMappingURL=main.js.map