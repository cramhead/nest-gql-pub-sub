import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule, } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import { PostsModule } from './posts/posts.module';
import { AuthorsResolver } from './authors/authors.resolver';
import { AuthorsModule } from './authors/authors.module';
import { PostsResolver } from './posts/posts.resolver';
import { CommentsModule } from './comments/comments.module';
import { CommentsResolver } from './comments/comments.resolver';
import { PubsubModule } from './pubsub/pubsub.module';


@Module({
  imports: [GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    sortSchema: true,
    playground: false,
    // installSubscriptionHandlers: true,
    subscriptions: {
      'graphql-ws': true
    },
    plugins: [ApolloServerPluginLandingPageLocalDefault()],

  }),
    PostsModule,
    AuthorsModule,
    CommentsModule,
    PubsubModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthorsResolver, PostsResolver, CommentsResolver],
})
export class AppModule { }
