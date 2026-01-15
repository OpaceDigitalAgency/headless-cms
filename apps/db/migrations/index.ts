import * as migration_20260115_161539 from './20260115_161539';
import * as migration_20260115_161751 from './20260115_161751';

export const migrations = [
  {
    up: migration_20260115_161539.up,
    down: migration_20260115_161539.down,
    name: '20260115_161539',
  },
  {
    up: migration_20260115_161751.up,
    down: migration_20260115_161751.down,
    name: '20260115_161751'
  },
];
