'use strict';

const Dotenv = require('dotenv');
const amqp = require('amqplib');
const fs = require('fs');
const { parse } = require('json2csv');
const Mail = require('./lib/services/mail');

Dotenv.config({ path: `.env` });
const QUEUE_NAME = process.env.QUEUE_NAME;

const processMessage = async (msg) => {
    const { to, movies } = JSON.parse(msg.content.toString());
    const mail = new Mail();

    console.log(`Exporting for ${to}...`);

    const csv = parse(movies);
    const filePath = `./exports/movies-${Date.now()}.csv`;

    fs.writeFileSync(filePath, csv);

    await mail.sendEmailWithExport(to, filePath);

    fs.unlinkSync(filePath);
};

const startWorker = async () => {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    const channel = await connection.createChannel();
    await channel.assertQueue(QUEUE_NAME, { durable: true });

    console.log('Worker ready to export..');

    channel.consume(QUEUE_NAME, async (msg) => {
        try {
            await processMessage(msg);
            channel.ack(msg);
        }
        catch (err) {
            console.error('Error while processing:', err);
            channel.nack(msg, false, true);
        }
    });
};

startWorker().catch(console.error);
