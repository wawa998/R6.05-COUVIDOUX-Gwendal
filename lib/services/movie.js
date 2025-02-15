'use strict';

const { Service } = require('@hapipal/schmervice');
const Mail = require('./mail');

module.exports = class MovieService extends Service {

    get() {

        const { Movie } = this.server.models();

        return Movie.query();
    }

    async create(movie) {

        const { Movie } = this.server.models();
        const { User } = this.server.models();
        const mail = new Mail();

        const userMails = await User.query().select('mail');

        for (const userMail of userMails) {
            mail.newMovieNotification(userMail.mail, movie.title);
        }

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

    async patch(id, movie) {

        const { Movie } = this.server.models();
        const { Favorite } = this.server.models();
        const { User } = this.server.models();
        const mail = new Mail();

        await Movie.query().findById(id).patch( movie );
        const patchedMovie = await Movie.query().findById(id);

        const userIds = await Favorite.query().select('id_user').where('id_movie','=', id);

        for (const userId of userIds) {
            const userMail = await User.query().select('mail').where('id','=', userId.id_user);
            mail.patchMovieNotification(userMail[0].mail, patchedMovie.title);
        }

        return patchedMovie;
    }
};
