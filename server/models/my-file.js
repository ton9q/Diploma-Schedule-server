const app = require('../server');
const logger = require('../logger')(module);

module.exports = MyFile => {
  MyFile.afterRemote('upload', (context, methodOutput, next) => {
    const { Teacher } = app.models;
    const { result } = methodOutput;
    const teacherId = context.req.query.teacherId;

    const fileId = result[0]._id;

    if (teacherId) {
      Teacher.findById(teacherId).then(teacher => {
        if (teacher) {
          logger.info(`teacher with id="${teacherId}" was founded`);
          teacher.updateAttributes({ photoId: fileId });
          logger.info(`photo with id="${fileId}" was add to teacher`);
        }
      });
    }

    next();
  });
};
