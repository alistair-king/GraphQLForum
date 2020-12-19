import { createConnection } from 'typeorm';

import { Constants } from '@server/common/constants'

import { Forum } from '@server/forums/entity'
import { Thread } from '@server/forums/threads/entity'
import { Reply } from '@server/forums/threads/reply/entity'
import { User } from '@server/users/entity'

require('dotenv').config() 
const {
  DB_HOST = '',
  DB_DATABASE = '',
  DB_USER = '',
  DB_PASSWORD = ''
} = process.env

export const databaseProviders = [
  {
    provide: Constants.DATABASE_CONNECTION,
    useFactory: async () => await createConnection({
      type: 'mysql',
      host: DB_HOST,
      port: 3306,
      database: DB_DATABASE,
      username: DB_USER,
      password: DB_PASSWORD,
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
