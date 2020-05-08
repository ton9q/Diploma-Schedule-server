const { initRemoteMethods, disableRemoteMethods, disableRelationRemoteMethods } = require('../utils/models');

module.exports = ArchivedTimetable => {
  disableRemoteMethods(ArchivedTimetable, {
    except: [
      'create',
      'patchAttributes',
    ],
  });

  disableRelationRemoteMethods(ArchivedTimetable, 'archiver');
  disableRelationRemoteMethods(ArchivedTimetable, 'nestedDaysOfWeek');
  disableRelationRemoteMethods(ArchivedTimetable, 'group');

  initRemoteMethods(ArchivedTimetable);
};
