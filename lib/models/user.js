'use strict';

const Joi = require('joi');
const { Model } = require('@hapipal/schwifty');

module.exports = class User extends Model {

    static get tableName() {

        return 'user';
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer().greater(0),
            firstName: Joi.string().min(3).example('John').description('Firstname of the user'),
            lastName: Joi.string().min(3).example('Doe').description('Lastname of the user'),
            password: Joi.string().min(8).example('password').description('Password'),
            mail: Joi.string().email().example('example.mail@gmail.com').description('Mail address'),
            username: Joi.string().min(3).example('PetitLapinTueur').description('Username of the user'),
            scope: Joi.array().example('[user]').description('Scope'),
            createdAt: Joi.date(),
            updatedAt: Joi.date()
        });
    }

    static get jsonAttributes() {

        return ['scope'];
    }

    $beforeInsert(queryContext) {

        this.updatedAt = new Date();
        this.createdAt = this.updatedAt;
        this.scope = ['user'];
    }

    $beforeUpdate(opt, queryContext) {

        this.updatedAt = new Date();
    }

};
