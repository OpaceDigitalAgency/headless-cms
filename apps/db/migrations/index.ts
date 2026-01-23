import * as migration_20260123_170810 from './20260123_170810';

export const migrations = [
  {
    up: migration_20260123_170810.up,
    down: migration_20260123_170810.down,
    name: '20260123_170810'
  },
];
