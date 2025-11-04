"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const dotenv = require("dotenv");
const app_module_1 = require("./app.module");
dotenv.config();
async function bootstrap() {
    const logger = new common_1.Logger('Bootstrap');
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const origins = (process.env.CORS_ORIGINS || '').split(',').map(o => o.trim()).filter(Boolean);
    app.enableCors({
        origin: origins.length ? origins : ['http://localhost:3001', 'http://localhost:3000'],
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type',
            'Authorization',
            'Accept',
            'Cache-Control',
            'X-Requested-With',
            'Origin',],
    });
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true, }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Choppi API')
        .setDescription('API Swagger for Choppi MVP')
        .setVersion('0.1')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    const port = process.env.PORT || 3000;
    await app.listen(port);
    logger.log(`Server running on http://localhost:${port}`);
    logger.log(`Swagger: http://localhost:${port}/api`);
    logger.log(`🔑 JWT expires in: ${process.env.JWT_EXPIRES_IN}s`);
}
bootstrap();
