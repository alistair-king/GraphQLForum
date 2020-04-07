import { Connection, Repository } from 'typeorm';

import { Constants } from '../../common/constants'

import { Thread } from './entity';

export const ThreadProviders = [
  {
    provide: Constants.THREAD_REPO,
    useFactory: (connection: Connection) => connection.getRepository(Thread),
    inject: [Constants.DATABASE_CONNECTION]
  },
];
