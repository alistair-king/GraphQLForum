import { Connection, Repository } from 'typeorm';

import { Thread } from './entity';

export const ThreadProviders = [
  {
    provide: 'THREAD_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Thread),
    inject: ['DATABASE_CONNECTION'],
  },
];
