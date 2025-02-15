'use strict';

const { Service } = require('@hapipal/schmervice');
const Nodemailer = require('nodemailer');
const Dotenv = require('dotenv');

Dotenv.config({ path: `.env` });

module.exports = class MailService extends Service {

    createTransporter() {
        return Nodemailer.createTransport({
            host: process.env.NODEMAILER_HOST,
            port: process.env.NODEMAILER_PORT,
            secure: false, // true for port 465, false for other ports
            auth: {
                user: process.env.NODEMAILER_USER,
                pass: process.env.NODEMAILER_PASS
            }
        });
    }

    async sendWelcomeMessage(username, to) {

        const tranporter = this.createTransporter();

        const info = await tranporter.sendMail({
            from: '"' + process.env.NODEMAILER_USERNAME + '" <' + process.env.NODEMAILER_USER + '>',
            to,
            subject: 'Welcome',
            text: 'Welcome aboard ' + username + ' !',
            html: `Welcome to ${username} !`
        });

        console.log('Message sent: %s', info.messageId);
    }

    async newMovieNotification(to, movie) {

        const tranporter = this.createTransporter();

        const info = await tranporter.sendMail({
            from: '"' + process.env.NODEMAILER_USERNAME + '" <' + process.env.NODEMAILER_USER + '>',
            to,
            subject: 'New movie',
            text: 'A new movie named : ' + movie + ' has been added!',
            html: `A new movie named : ${movie} has been added!`
        });

        console.log('Message sent: %s', info.messageId);
    }

    async patchMovieNotification(to, movie) {

        const tranporter = this.createTransporter();

        const info = await tranporter.sendMail({
            from: '"' + process.env.NODEMAILER_USERNAME + '" <' + process.env.NODEMAILER_USER + '>',
            to,
            subject: 'Modified fav',
            text: 'Your favorite movie : ' + movie + ' , has been modified!',
            html: `Your favorite movie : ${movie} , has been modified!`
        });

        console.log('Message sent: %s', info.messageId);
    }

};
