import { IChannel } from '../types';
import { apiCall } from '../utils/networking';

function isIChannel(arg: any): arg is IChannel {
  return (
    typeof arg.teamId === 'string' &&
    typeof arg.name === 'string' &&
    typeof arg.description === 'string' &&
    typeof arg.id === 'string' &&
    Array.isArray(arg.messages)
  );
}

function assertIsIChannel(arg: any): asserts arg is IChannel {
  if (!isIChannel(arg)) {
    throw new Error(
      `Data does not conform to IChannel: ${JSON.stringify(arg)}`,
    );
  }
}

const cachedChannelRecords: Record<string, Promise<IChannel>> = {};

export async function getChannelById(id: string): Promise<IChannel> {
  let cached = cachedChannelRecords[id];
  if (typeof cached !== 'undefined') return await cached;
  cached = cachedChannelRecords[id] = apiCall(`Channels/${id}`).then(
    (data) => {
      assertIsIChannel(data);
      return data;
    },
  );

  return await cached;
}
