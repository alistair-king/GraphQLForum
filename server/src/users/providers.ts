import { Connection, Repository } from 'typeorm';

import { Constants } from '@server/common/constants'

import { User } from './entity';

export const UserProviders = [
  {
    provide: Constants.USER_REPO,
    useFactory: (connection: Connection) => connection.getRepository(User),
    inject: [Constants.DATABASE_CONNECTION],
  },
];
