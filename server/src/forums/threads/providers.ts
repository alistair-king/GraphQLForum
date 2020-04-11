import { Connection, Repository } from 'typeorm';

import { Constants } from '@server/common/constants'

import { Thread } from './entity';

export const ThreadProviders = [
  {
    provide: Constants.THREAD_REPO,
    useFactory: (connection: Connection) => connection.getRepository(Thread),
    inject: [Constants.DATABASE_CONNECTION]
  }  
];
