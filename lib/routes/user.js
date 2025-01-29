'use strict';

const Joi = require('joi');

module.exports = [{
    method: 'post',
    path: '/user',
    options: {
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
        tags: ['api'],
        validate: {
            params: Joi.object({
                id: Joi.string().required().description('ID of the user to delete')
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
}
];

