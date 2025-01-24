'use strict';

const { Service } = require('@hapipal/schmervice');
const Encrypt = require('@wawa998/iut-encrypt');

module.exports = class UserService extends Service {


    create(user) {

        const { User } = this.server.models();

        user.password = Encrypt.sha1(user.password);

        return User.query().insertAndFetch(user);
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
