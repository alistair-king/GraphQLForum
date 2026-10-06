import { Module } from '@nestjs/common'

import { GqlAuthGuard } from './gql-auth.guard'
import { JwtStrategy } from './jwt.strategy'

@Module({
  providers: [JwtStrategy, GqlAuthGuard],
  exports: [GqlAuthGuard],
})
export class AuthModule {}
