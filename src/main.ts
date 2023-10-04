import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { altairExpress } from 'altair-express-middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // configure the Altair web-based client/playground
  app.use(
    '/graphql', altairExpress({
      endpointURL: '/graphql',
      subscriptionsEndpoint: '/graphql',
      subscriptionsProtocol: "ws",
      initialSettings: {
        "theme.editorFontFamily": "'Source Code Pro', 'Consolas', 'Inconsolata', 'Droid Sans Mono', 'Monaco', monospace",
        "theme.fontsize": 24,
        "theme": "dark",
        "enableExperimental": false,
        'request.withCredentials': true
      }
}));

  await app.listen(4003);
  console.log(`listening on 4003`)
}
bootstrap();
