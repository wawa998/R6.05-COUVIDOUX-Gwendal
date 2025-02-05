'use strict';

const { Service } = require('@hapipal/schmervice');
const Mail = require('./mail');
const Encrypt = require('@wawa998/iut-encrypt');

module.exports = class MovieService extends Service {

    get() {

        const { Movie } = this.server.models();

        return Movie.query();
    }

    create(movie) {

        const { Movie } = this.server.models();

        return Movie.query().insertAndFetch(movie);
    }

    async delete(movieId) {

        const { Movie } = this.server.models();

        const res = await Movie.query().deleteById(movieId);
        if (res === 1) {
            return '';
        }

        return 'error in the suppression';
    }
    patch(id, movie) {

        const { Movie } = this.server.models();

        return Movie.query().findById(id).patch( movie );
    }
};
