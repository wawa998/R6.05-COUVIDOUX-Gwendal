'use strict';

const Joi = require('joi');

module.exports = {

    async up(knex) {

        await knex.schema.createTable('favorite', (table) => {
            table.integer('id_user').notNull();
            table.integer('id_movie').notNull();
        });
    },

    async down(knex) {

        await knex.schema.dropTableIfExists('favorite');
    }
};
