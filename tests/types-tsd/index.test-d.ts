import { ITeam, IUser, IMessage, IChannel } from '../../src/types';
import { expectNotAssignable, expectAssignable } from 'tsd';

expectNotAssignable<IUser>(null);
expectAssignable<IUser>({
  id: 1,
  username: '',
  name: '',
  iconUrl: '',
});

expectNotAssignable<IMessage>(null);
expectAssignable<IMessage>({
  id: 1,
  teamId: '',
  channelId: '',
  userId: '',
  createdAt: '',
  user: {} as IUser,
  body: '',
});

expectNotAssignable<ITeam>(null);
expectAssignable<ITeam>({
  channels: [],
  iconUrl: '',
  id: '',
  name: '',
});

expectNotAssignable<IChannel>(null);
expectAssignable<IChannel>({
  id: '',
  name: '',
  description: '',
  teamId: '',
  messages: [{} as IMessage],
});
