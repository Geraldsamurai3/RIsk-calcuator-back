import { NestFactory } from "@nestjs/core"
import { ValidationPipe } from "@nestjs/common"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"
import helmet from "helmet"
import { AppModule } from "./app.module"
import { corsConfig } from "./common/cors.config"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Security
  app.use(helmet())

  // Global validation pipe
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions: { enableImplicitConversion: true }, // 👈
  }),
)


  app.enableCors(corsConfig)
  
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }))


  // API prefix
  app.setGlobalPrefix("api")

  // Swagger documentation
  const config = new DocumentBuilder()
    .setTitle("Alien Risk API")
    .setDescription("API for calculating and managing alien invasion risks")
    .setVersion("1.0")
    .addTag("risks")
    .addTag("health")
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("docs", app, document)

  // Start server
  const port = process.env.PORT || 3001
  const host = process.env.NODE_ENV === "production" ? "0.0.0.0" : "localhost"

  await app.listen(port, host)
  console.log(`🚀 Alien Risk API running on http://${host}:${port}`)
  console.log(`📚 API Documentation: http://${host}:${port}/docs`)
}

bootstrap()
