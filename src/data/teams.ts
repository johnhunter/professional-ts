import type { ITeam } from '../types';
import { apiCall } from '../utils/networking';
import { assertIsTypedArray } from '../utils/assertions';

export function isITeam(arg: any): arg is ITeam {
  return (
    typeof arg.iconUrl === 'string' &&
    typeof arg.name === 'string' &&
    typeof arg.id === 'string' &&
    Array.isArray(arg.channels)
  );
}

function assertIsITeam(arg: any): asserts arg is ITeam {
  if (!isITeam(arg)) {
    throw new Error(
      `Data does not conform to ITeam: ${JSON.stringify(arg)}`,
    );
  }
}

let cachedAllTeamsList: Promise<ITeam[]>;
export async function getAllTeams(): Promise<ITeam[]> {
  if (typeof cachedAllTeamsList === 'undefined')
    cachedAllTeamsList = apiCall('teams').then((data) => {
      assertIsTypedArray(data, isITeam);
      return data;
    });

  return await cachedAllTeamsList;
}

const cachedTeamRecords: Record<string, Promise<ITeam>> = {};

export async function getTeamById(id: string): Promise<ITeam> {
  let cached = cachedTeamRecords[id];
  if (typeof cached === 'undefined')
    cached = cachedTeamRecords[id] = apiCall(`teams/${id}`).then(
      (data) => {
        assertIsITeam(data);
        return data;
      },
    );
  return await cached;
}
