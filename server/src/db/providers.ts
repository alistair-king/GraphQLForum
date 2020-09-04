import { createConnection } from 'typeorm';

import { Constants } from '@server/common/constants'

import { Forum } from '@server/forums/entity'
import { Thread } from '@server/forums/threads/entity'
import { Reply } from '@server/forums/threads/reply/entity'
import { User } from '@server/users/entity'

export const databaseProviders = [
  {
    provide: Constants.DATABASE_CONNECTION,
    useFactory: async () => await createConnection({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: '',
      password: '',
      database: '',
      entities: [
        Forum,
        Thread,
        Reply,
        User
      ],
      synchronize: true,
      logging: true
    }),
  },
];
