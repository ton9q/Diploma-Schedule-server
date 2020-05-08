
const {
  disableRemoteMethods,
  disableRelationRemoteMethods,
  initRemoteMethods,
  initOperationHooks,
} = require('../utils/models');

module.exports = Timetable => {
  disableRemoteMethods(Timetable, {
    except: [
      'create',
      'patchAttributes',
    ],
  });

  disableRelationRemoteMethods(Timetable, 'nestedDaysOfWeek');
  disableRelationRemoteMethods(Timetable, 'group');

  initRemoteMethods(Timetable);

  initOperationHooks(Timetable);
};
