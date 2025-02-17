'use strict';

const { Service } = require('@hapipal/schmervice');
const amqp = require('amqplib');
const Dotenv = require('dotenv');

Dotenv.config({ path: `.env` });

module.exports = class ExportService extends Service {

    async get(request, to) {

        const { movieService } = request.services();

        const movies = await movieService.get();

        const QUEUE_NAME = process.env.QUEUE_NAME;
        const connection = await amqp.connect(process.env.RABBITMQ_URL);
        const channel = await connection.createChannel();
        await channel.assertQueue(QUEUE_NAME, { durable: true });

        const message = JSON.stringify({ to, movies });

        channel.sendToQueue(QUEUE_NAME, Buffer.from(message), { persistent: true });

        return { message: 'The export is currently being processed, you will receive a mail' };
    }
};
