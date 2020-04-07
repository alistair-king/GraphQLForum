import { createConnection } from 'typeorm';

import { Forum } from '../forums/entity'
import { Thread } from '../forums/threads/entity'
import { User } from '../users/entity'

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
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
        User
      ],
      synchronize: true,
      logging: true
    }),
  },
];
