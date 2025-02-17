'use strict';

const Joi = require('joi');

module.exports = [{
    method: 'GET',
    path: '/favorite/get',
    options: {
        auth: {
            scope: ['admin', 'user']
        },
        tags: ['api']
    },
    handler: async (request, h) => {

        const { favoriteService } = request.services();

        return await favoriteService.get(request.auth.credentials.id);
    }
},
{ method: 'POST',
    path: '/favorite/add/{id}',
    options: {
        auth: {
            scope: ['user']
        },
        tags: ['api'],
        validate: {
            params: Joi.object({
                id: Joi.string().required().description('ID of the movie to add as favorite')
            })
        } },
    handler: async (request, h) => {

        const { favoriteService } = request.services();

        return await favoriteService.add(request.auth.credentials.id, request.params.id );
    }
},
{ method: 'DELETE',
    path: '/favorite/delete/{id}',
    options: {
        auth: {
            scope: ['user']
        },
        tags: ['api'],
        validate: {
            params: Joi.object({
                id: Joi.string().required().description('ID of the movie to remove from favorite')
            })
        } },
    handler: async (request, h) => {

        const { favoriteService } = request.services();

        return await favoriteService.delete(request.auth.credentials.id, request.params.id );
    }
}
];
