import 'dotenv/config'

import { Module } from '@nestjs/common'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { GraphQLModule } from '@nestjs/graphql'

import { AuthModule } from './auth/module'
import { CommonModule } from './common/common.module'
import { DatabaseModule } from './db/module'
import { ForumsModule } from './forums/module'
import { UsersModule } from './users/module'

// Inline so the Apollo plugin is contextually typed by the driver config;
// @apollo/server ships dual esm/cjs type declarations that don't structurally
// match across import resolutions, so a shared typed const would need a cast
const loggingPlugin = {
  async requestDidStart(requestContext) {
    const startedAt = Date.now()
    const label =
      requestContext.request.operationName ?? 'anonymous operation'
    return {
      async willSendResponse() {
        const ms = Date.now() - startedAt
        console.log(`GraphQL ${label} completed in ${ms}ms`)
      },
    }
  },
}

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      subscriptions: {
        'graphql-ws': true,
      },
      plugins: [loggingPlugin],
    }),
    CommonModule,
    DatabaseModule,
    AuthModule,
    UsersModule,
    ForumsModule,
  ],
})
export class AppModule {}
