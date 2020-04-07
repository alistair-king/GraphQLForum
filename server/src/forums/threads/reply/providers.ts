import { Connection, Repository } from 'typeorm';

import { Constants } from '../../../common/constants'

import { Reply } from './entity';

export const ReplyProviders = [
  {
    provide: Constants.REPLY_REPO,
    useFactory: (connection: Connection) => connection.getRepository(Reply),
    inject: [Constants.DATABASE_CONNECTION],
  },
];
