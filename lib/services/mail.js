'use strict';

const { Service } = require('@hapipal/schmervice');
const Nodemailer = require('nodemailer');
const Dotenv = require('dotenv');

Dotenv.config({ path: `.env` });

module.exports = class MailService extends Service {

    async sendMessage(username, to) {

        const tranporter = Nodemailer.createTransport({
            host: process.env.NODEMAILER_HOST,
            port: process.env.NODEMAILER_PORT,
            secure: false, // true for port 465, false for other ports
            auth: {
                user: process.env.NODEMAILER_USER,
                pass: process.env.NODEMAILER_PASS
            }
        });

        const info = await tranporter.sendMail({
            from: '"' + process.env.NODEMAILER_USERNAME + '" <' + process.env.NODEMAILER_USER + '>',
            to,
            subject: 'Welcome',
            text: 'Welcome aboard ' + username + ' !',
            html: `Welcome to ${username} !`
        });

        console.log('Message sent: %s', info.messageId);
    }

};
