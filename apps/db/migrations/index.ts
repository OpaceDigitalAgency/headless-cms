import * as migration_20260124_145601 from './20260124_145601';

export const migrations = [
  {
    up: migration_20260124_145601.up,
    down: migration_20260124_145601.down,
    name: '20260124_145601'
  },
];
