import { INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule, OpenAPIObject } from '@nestjs/swagger'
import { configService } from './config.service';

export function initSwagger(app: INestApplication): OpenAPIObject {
  const options = new DocumentBuilder()
    .setTitle('博客api')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('blog')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-doc', app, document);

  return document
}
