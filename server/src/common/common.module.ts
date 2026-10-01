import { Module } from '@nestjs/common'
import { PubSub } from 'graphql-subscriptions'

import { Constants } from './constants'
import { DateScalar } from './scalars/date.scalar'

@Module({
  providers: [
    DateScalar,
    {
      provide: Constants.PUB_SUB,
      useFactory: () => new PubSub(),
    },
  ],
  exports: [DateScalar, Constants.PUB_SUB],
})
export class CommonModule {}
