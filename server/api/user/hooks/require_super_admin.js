const { requireUserRole } = require('../../common/hooks/auth');
const { SUPER_ADMIN } = require('../../../../common/constants/user_roles');

module.exports = requireUserRole(SUPER_ADMIN);
