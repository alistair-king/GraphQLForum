import { Connection, Repository } from 'typeorm';

import { Constants } from '@server/common/constants'

import { Forum } from './entity'

export const ForumProviders = [
  {
    provide: Constants.FORUM_REPO,
    useFactory: (connection: Connection) => connection.getRepository(Forum),
    inject: [Constants.DATABASE_CONNECTION],
  },
];
