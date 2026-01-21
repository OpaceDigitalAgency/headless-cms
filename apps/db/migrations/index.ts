import * as migration_20260121_065221 from './20260121_065221';

export const migrations = [
  {
    up: migration_20260121_065221.up,
    down: migration_20260121_065221.down,
    name: '20260121_065221'
  },
];
