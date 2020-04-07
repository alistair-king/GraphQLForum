import { createConnection } from 'typeorm';

import { Constants } from '../common/constants'

import { Forum } from '../forums/entity'
import { Thread } from '../forums/threads/entity'
import { Reply } from '../forums/threads/reply/entity'
import { User } from '../users/entity'

export const databaseProviders = [
  {
    provide: Constants.DATABASE_CONNECTION,
    useFactory: async () => await createConnection({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'alistairk',
      password: 'test',
      database: 'graphqlforum',
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
