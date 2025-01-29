'use strict';

const Joi = require('joi');

module.exports = [{
    method: 'post',
    path: '/user',
    options: {
        auth: false,
        tags: ['api'],
        validate: {
            payload: Joi.object({
                firstName: Joi.string().required().min(3).example('John').description('Firstname of the user'),
                lastName: Joi.string().required().min(3).example('Doe').description('Lastname of the user'),
                password: Joi.string().required().min(8).example('password').description('Password'),
                mail: Joi.string().required().email().example('example.mail@gmail.com').description('Mail address'),
                username: Joi.string().required().min(3).example('PetitLapinTueur').description('Username of the user')
            })
        }
    },
    handler: async (request, h) => {

        const { userService } = request.services();

        return await userService.create(request.payload);
    }
},{
    method: 'post',
    path: '/user/login',
    options: {
        auth: false,
        tags: ['api'],
        validate: {
            payload: Joi.object({
                password: Joi.string().required().min(8).example('password').description('Password'),
                mail: Joi.string().required().email().example('example.mail@gmail.com').description('Mail address')
            })
        }
    },
    handler: async (request, h) => {

        const { userService } = request.services();

        return await userService.login(request.payload);
    }
},
{
    method: 'get',
    path: '/users',
    options: {
        auth: {
            scope: ['user', 'admin']
        },
        tags: ['api']
    },

    handler: async (request, h) => {

        const { userService } = request.services();

        return await userService.get();
    }
},
{
    method: 'delete',
    path: '/user/{id}',
    options: {
        auth: {
            scope: ['admin']
        },
        tags: ['api'],
        validate: {
            params: Joi.object({
                id: Joi.string().required().description('ID of the user to delete')
            })
        }
    },
    handler: async (request, h) => {

        const { userService } = request.services();

        return await userService.delete(request.params.id);
    }
},
{
    method: 'patch',
    path: '/user/{id}',
    options: {
        auth: {
            scope: ['admin']
        },
        tags: ['api'],
        validate: {
            params: Joi.object({
                id: Joi.string().required().description('ID of the user to modify')
            }),
            payload: Joi.object({
                firstName: Joi.string().min(3).example('John').description('Firstname of the user'),
                lastName: Joi.string().min(3).example('Doe').description('Lastname of the user'),
                password: Joi.string().min(8).example('password').description('Password'),
                mail: Joi.string().email().example('example.mail@gmail.com').description('Mail address'),
                username: Joi.string().min(3).example('PetitLapinTueur').description('Username of the user')
            })
        }
    },
    handler: async (request, h) => {

        const { userService } = request.services();

        return await userService.patch(request.params.id, request.payload);
    }
},
{
    method: 'patch',
    path: '/user/admin/{id}',
    options: {
        auth: false,
        tags: ['api'],
        validate: {
            params: Joi.object({
                id: Joi.string().required().description('ID of the user to receive admin privilege')
            })
        }
    },
    handler: async (request, h) => {

        const { userService } = request.services();

        return await userService.admin(request.params.id);
    }
}
];

