const {
  disableRemoteMethods,
  disableRelationRemoteMethods,
  initRemoteMethods,
  initOperationHooks,
  initValidations,
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

  initValidations(Timetable);
};
