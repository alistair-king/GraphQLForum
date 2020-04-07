import { Connection, Repository } from 'typeorm';

import { Forum } from './entity';

export const ForumProviders = [
  {
    provide: 'FORUM_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Forum),
    inject: ['DATABASE_CONNECTION'],
  },
];
