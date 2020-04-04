import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { UsersModule } from './users/users.module';
import { ForumsModule } from './forum/forums.module';

@Module({
  imports: [
    UsersModule,
    ForumsModule,
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
    }),
  ],
})
export class AppModule {}
