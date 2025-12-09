import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  try {
    console.log("🚀 [DEBUG] Starting NestJS application...");
    console.log("🚀 [DEBUG] Attempting to create NestJS app instance...");
    const app = await NestFactory.create(AppModule);
    console.log("✅ [DEBUG] NestJS application created successfully");

    // Enable CORS
    console.log("🔧 [DEBUG] Enabling CORS...");
    app.enableCors();
    console.log("✅ [DEBUG] CORS enabled");

    // Global validation pipe
    console.log("🔧 [DEBUG] Setting up global validation pipe...");
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      })
    );
    console.log("✅ [DEBUG] Validation pipe configured");

    // Swagger configuration
    console.log("🔧 [DEBUG] Configuring Swagger...");
    const config = new DocumentBuilder()
      .setTitle("Nutrition API")
      .setDescription("Backend for nutrition tracking")
      .setVersion("1.0")
      .addBearerAuth(
        {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          name: "JWT",
          description: "Enter JWT token",
          in: "header",
        },
        "JWT-auth"
      )
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api/docs", app, document);
    console.log("✅ [DEBUG] Swagger configured");

    const port = process.env.PORT || 3000;
    console.log(`🔧 [DEBUG] Attempting to listen on port ${port}...`);
    await app.listen(port);
    console.log(`✅ [DEBUG] Server is listening on port ${port}`);
    console.log(`🌐 Application is running on: http://localhost:${port}`);
    console.log(`📚 Swagger documentation: http://localhost:${port}/api/docs`);
  } catch (error) {
    console.error("❌ [ERROR] Error starting server:");
    console.error("❌ [ERROR] Error type:", error?.constructor?.name);
    console.error("❌ [ERROR] Error message:", error?.message);
    console.error("❌ [ERROR] Full error:", error);
    if (error?.stack) {
      console.error("❌ [ERROR] Stack trace:", error.stack);
    }
    process.exit(1);
  }
}

bootstrap();
