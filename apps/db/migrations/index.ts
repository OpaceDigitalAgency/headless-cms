import * as migration_20260124_110331 from './20260124_110331';

export const migrations = [
  {
    up: migration_20260124_110331.up,
    down: migration_20260124_110331.down,
    name: '20260124_110331'
  },
];
