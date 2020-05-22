const request = require('supertest');
const app = require('../../../../../server/server');
const { ADMIN, CREATOR } = require('../../../../../common/constants/user_roles');
const { createUser, getAccessToken } = require('../../../helpers/users');

describe('API > Users > updateProfileAsRegistration', () => {
    const { user: User } = app.models;
    const agent = request.agent(app);

    let user;
    let accessToken;
    const phone = '111';
    const roles = [CREATOR];
    const newPhone = '222';
    const newRoles = [ADMIN];

    beforeEach(async () => {
        user = await createUser({ phone, roles, registered: false });
        accessToken = await getAccessToken(user.id);
    });

    afterEach(async () => {
        await User.destroyAll();
    });

    describe.silent('when user isn\'t authenticated', () => {
        let response;

        beforeEach(async () => {
            response = await agent
                .put('/api/users/registration')
                .send({ data: { phone: newPhone, roles: newRoles } });
        });

        it('returns status 401', async () => {
            expect(response.statusCode).toBe(401);
        });

        it('doesn\'t update user', async () => {
            const initialUserData = user.toJSON();

            user = await User.findById(user.id);
            const newUserData = user.toJSON();

            expect(newUserData).toEqual(initialUserData);
        });
    });

    describe('when user is authenticated', () => {
        let response;

        beforeEach(async () => {
            response = await agent
                .put('/api/users/registration')
                .query({ access_token: accessToken })
                .send({ data: { phone: newPhone, roles: newRoles } });

            user = await User.findById(user.id);
        });

        it('returns status 200', () => {
            expect(response.statusCode).toBe(200);
        });

        it('sets value of field "registered" to true', () => {
            expect(user.registered).toEqual(true);
        });

        it('updates allowed user fields', () => {
            expect(user.phone).toEqual(newPhone);
        });

        it('doesn\'t update not allowed user fields', () => {
            expect(user.roles).toEqual(roles);
        });
    });
});
