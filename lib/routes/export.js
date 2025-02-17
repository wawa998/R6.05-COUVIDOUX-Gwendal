'use strict';

module.exports = {
    method: 'GET',
    path: '/export/movies',
    options: {
        auth: {
            scope: ['admin']
        },
        tags: ['api']
    },
    handler: async (request, h) => {

        const { exportService } = request.services();
        const to = request.auth.credentials.email;
        return await exportService.get(request, to);
    }
};
