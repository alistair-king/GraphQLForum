import 'dotenv/config'

import { Module } from '@nestjs/common'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { GraphQLModule } from '@nestjs/graphql'

import { AuthModule } from './auth/module'
import { CommonModule } from './common/common.module'
import { LoggingPlugin } from './common/plugins/logging.plugin'
import { DatabaseModule } from './db/module'
import { ForumsModule } from './forums/module'
import { UsersModule } from './users/module'

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      subscriptions: {
        'graphql-ws': true,
      },
      plugins: [
        // cast needed: @apollo/server ships dual esm/cjs type declarations
        // that don't structurally match @nestjs/apollo's compiled imports
        LoggingPlugin as any,
      ],
    }),
    CommonModule,
    DatabaseModule,
    AuthModule,
    UsersModule,
    ForumsModule,
  ],
})
export class AppModule {}
