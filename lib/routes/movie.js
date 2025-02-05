'use strict';

const Joi = require('joi');

module.exports = [{
    method: 'get',
    path: '/movies',
    options: {
        auth: {
            scope: ['user', 'admin']
        },
        tags: ['api']
    },

    handler: async (request, h) => {

        const { movieService } = request.services();

        return await movieService.get();
    }
},
{
    method: 'post',
    path: '/movie',
    options: {
        auth: {
            scope: ['admin']
        },
        tags: ['api'],
        validate: {
            payload: Joi.object({
                title: Joi.string().min(3).example('Avenger mid game').required(),
                description: Joi.string().min(3).example('Raconte l histoire du milieu du dernier film Avenger').required(),
                releaseDate: Joi.date().example(new Date('1963-06-12')).required(),
                director: Joi.string().min(3).example('Stan Lee').required()
            })
        }
    },
    handler: async (request, h) => {

        const { movieService } = request.services();

        return await movieService.create(request.payload);
    }
},
{
    method: 'delete',
    path: '/movie/{id}',
    options: {
        auth: {
            scope: ['admin']
        },
        tags: ['api'],
        validate: {
            params: Joi.object({
                id: Joi.string().required().description('ID of the movie to delete')
            })
        }
    },
    handler: async (request, h) => {

        const { movieService } = request.services();

        return await movieService.delete(request.params.id);
    }
},
{
    method: 'patch',
    path: '/movie/{id}',
    options: {
        auth: {
            scope: ['admin']
        },
        tags: ['api'],
        validate: {
            params: Joi.object({
                id: Joi.string().required().description('ID of the movie to modify')
            }),
            payload: Joi.object({
                title: Joi.string().min(3).example('Avenger mid game'),
                description: Joi.string().min(3).example('Raconte l histoire du milieu du dernier film Avenger'),
                releaseDate: Joi.date().example(new Date('1963-06-12')),
                director: Joi.string().min(3).example('Stan Lee')
            })
        }
    },
    handler: async (request, h) => {

        const { movieService } = request.services();

        return await movieService.patch(request.params.id, request.payload);
    }
}
];
