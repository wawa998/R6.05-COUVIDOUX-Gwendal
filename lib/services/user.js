'use strict';

const { Service } = require('@hapipal/schmervice');
const Encrypt = require('@wawa998/iut-encrypt');
const Boom = require('@hapi/boom');

module.exports = class UserService extends Service {


    create(user) {

        const { User } = this.server.models();

        user.password = Encrypt.sha1(user.password);

        return User.query().insertAndFetch(user);
    }

    async login(credentials) {

        const { User } = this.server.models();

        const password = await User.query()
            .select('password')
            .where('mail', '=', credentials.mail);

        if (password.length === 0 || !Encrypt.compareSha1(credentials.password, password[0].password)) {

            return Boom.unauthorized('invalid credentials');
        }

        return { login: 'successful' };
    }

    get() {
        const { User } = this.server.models();

        return User.query();
    }

    async delete(userId) {
        const { User } = this.server.models();

        const res = await User.query().deleteById(userId);
        if (res === 1) {
            return '';
        }

        return 'error in the suppression';

    }

    patch(id, user) {
        const { User } = this.server.models();
        if (user.password) {
            user.password = Encrypt.sha1(user.password);
        }

        return User.query().findById(id).patch( user );
    }
};
