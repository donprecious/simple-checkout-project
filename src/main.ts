import { HttpAdapterHost, NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ClassSerializerInterceptor, ValidationPipe } from "@nestjs/common";
import { LoggerInterceptor } from "@presentation/interceptors/loggerInterceptor";
import { AllExceptionsFilter } from "@presentation/middlewares/exceptionFilters";
import { setUpMicroservices } from "./microservice-setup";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const httpAdapter = app.get(HttpAdapterHost);
  // app.useGlobalFilters(new AllExceptionsFilter(httpAdapter.httpAdapter));
  app.setGlobalPrefix("api");
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    })
  );
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), {})
  );
  app.useGlobalInterceptors(new LoggerInterceptor());
  const config = new DocumentBuilder()
    .setTitle("Payment aggregator api")
    .setDescription("Api for payment aggregator")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
  await setUpMicroservices(app);
  const port = process.env.port??3000;
  await app.listen(port);
  console.log( `app running on port ${port}`)

}
bootstrap();
