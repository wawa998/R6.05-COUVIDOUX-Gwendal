'use strict';

const { Service } = require('@hapipal/schmervice');
const Boom = require('@hapi/boom');

module.exports = class FavoriteService extends Service {

    async get(userId) {

        const { Favorite } = this.server.models();
        const { Movie } = this.server.models();

        const favIdList = await Favorite.query().select('id_movie').where('id_user', '=', userId);
        const favList = [];

        for (const fav of favIdList) {
            favList.push(await Movie.query().findById(fav.id_movie.toString()));

        }

        return favList;
    }

    async add(userId, movieId) {

        const { Favorite } = this.server.models();
        const { Movie } = this.server.models();

        const alreadyFav = await Favorite.query().select('*')
            .where('id_user', '=', userId)
            .where('id_movie', '=', movieId);

        if (alreadyFav.length > 0) {
            return Boom.conflict('Movie already in favorite');
        }

        const movieExist = await Movie.query().select('*')
            .where('id', '=', movieId);

        if (movieExist.length === 0) {
            return Boom.badData('Movie dosn\'t exist');
        }

        return await Favorite.query().insert({ id_user: userId , id_movie: movieId });
    }

    async delete(userId, movieId) {

        const { Favorite } = this.server.models();
        const { Movie } = this.server.models();

        const alreadyFav = await Favorite.query().select('*')
            .where('id_user', '=', userId)
            .where('id_movie', '=', movieId);

        if (alreadyFav.length === 0) {
            return Boom.conflict('Movie not in favorite');
        }

        const movieExist = await Movie.query().select('*')
            .where('id', '=', movieId);

        if (movieExist.length === 0) {
            return Boom.badData('Movie dosn\'t exist');
        }

        return await Favorite.query()
            .delete()
            .where('id_user', '=', userId).
            where('id_movie', '=', movieId);
    }
};
