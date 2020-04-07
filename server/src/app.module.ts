import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'

import { DatabaseModule } from './db/module'
import { ForumsModule } from './forums/module'
import { UsersModule } from './users/module'

@Module({
  imports: [
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql'
    }),
    DatabaseModule,
    ForumsModule,
    UsersModule
  ],
})
export class AppModule {}
