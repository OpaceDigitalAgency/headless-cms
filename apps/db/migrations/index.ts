import * as migration_20260124_162532 from './20260124_162532';
import * as migration_20260223_100019 from './20260223_100019';
import * as migration_20260223_111041 from './20260223_111041';

export const migrations = [
  {
    up: migration_20260124_162532.up,
    down: migration_20260124_162532.down,
    name: '20260124_162532',
  },
  {
    up: migration_20260223_100019.up,
    down: migration_20260223_100019.down,
    name: '20260223_100019',
  },
  {
    up: migration_20260223_111041.up,
    down: migration_20260223_111041.down,
    name: '20260223_111041'
  },
];
