import { IMessage, IUser } from '../types';
import { apiCall } from '../utils/networking';
import { assertIsTypedArray } from '../utils/assertions';

function isIUser(arg: any): arg is IUser {
  return (
    typeof arg.id === 'string' &&
    typeof arg.username === 'string' &&
    typeof arg.name === 'string' &&
    typeof arg.iconUrl === 'string'
  );
}

function isIMessage(arg: any): arg is IMessage {
  return (
    typeof arg.createdAt === 'string' &&
    typeof arg.userId === 'string' &&
    typeof arg.channelId === 'string' &&
    typeof arg.teamId === 'string' &&
    typeof arg.id === 'string' &&
    typeof arg.body === 'string' &&
    isIUser(arg.user)
  );
}

const cachedMessageRecordArrays: Record<
  string,
  Promise<IMessage[]>
> = {};

export async function getChannelMessages(
  teamId: string,
  channelId: string,
): Promise<IMessage[]> {
  let cached = cachedMessageRecordArrays[channelId];
  if (typeof cached === 'undefined')
    cached = cachedMessageRecordArrays[channelId] = apiCall(
      `teams/${teamId}/channels/${channelId}/messages`,
    ).then((data) => {
      assertIsTypedArray(data, isIMessage);
      return data;
    });
  return await cached;
}
