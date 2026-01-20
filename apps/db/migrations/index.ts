import * as migration_20260120_144200 from './20260120_144200';

export const migrations = [
  {
    up: migration_20260120_144200.up,
    down: migration_20260120_144200.down,
    name: '20260120_144200'
  },
];
