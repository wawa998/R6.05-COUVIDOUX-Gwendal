'use strict';

const { Service } = require('@hapipal/schmervice');
const Encrypt = require('@wawa998/iut-encrypt');
const Boom = require('@hapi/boom');
const Jwt = require('@hapi/jwt');
const Mail = require('./mail');

module.exports = class UserService extends Service {


    async create(user) {

        const { User } = this.server.models();

        try {

            user.password = Encrypt.sha1(user.password);

            const createdUser = await User.query().insertAndFetch(user);

            const mail = new Mail();

            mail.sendMessage(user.username, user.mail);

            return createdUser;
        }
        catch (error) {
            return Boom.unauthorized('Email already in use');
        }


    }

    async login(credentials) {

        const { User } = this.server.models();

        const user = await User.query()
            .select('*')
            .where('mail', '=', credentials.mail);

        if (user.length === 0 || !Encrypt.compareSha1(credentials.password, user[0].password)) {

            return Boom.unauthorized('invalid credentials');
        }

        return Jwt.token.generate(
            {
                aud: 'urn:audience:iut',
                iss: 'urn:issuer:iut',
                firstName: user[0].firstName,
                lastName: user[0].lastName,
                email: user[0].mail,
                id: user[0].id,
                scope: user[0].scope //Le scope du user
            },
            {
                key: 'random_string', // La clé qui est définit dans lib/auth/strategies/jwt.js
                algorithm: 'HS512'
            },
            {
                ttlSec: 14400 // 4 hours
            }
        );
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

    async admin(userId) {
        const { User } = this.server.models();

        const user = await User.query().findById(userId);
        user.scope.push('admin');

        return User.query().findById(userId).patch( { scope: user.scope } );

    }
};
