const nodemailer = require('nodemailer');
const path = require('path');
const hbs = require('nodemailer-express-handlebars');

const {config} = require("../constants");
const emailTemplate = require('../email-template');
const {CError} = require("../errors");

module.exports = {
    sendEmail: (userEmail = '', emailAction = '', context = {}) => {
        const transporter = nodemailer.createTransport({
            from: 'no reply',
            auth: {
                user: config.NO_REPLY_EMAIL,
                pass: config.NO_REPLY_EMAIL_PASSWORD,
            },
            service: 'gmail',
        });

        const exphbsOptions = {
            viewEngine: {
                extname: '.hbs',
                layouts: 'main',
                layoutsDir: path.join(process.cwd(), 'email-template', 'layouts'),
                partialsDir: path.join(process.cwd(), 'email-template', 'partials')
            },
            viewPath: path.join(process.cwd(), 'email-template', 'views'),
            extName: '.hbs'
        }

        transporter.use('compile', hbs(exphbsOptions));

        const templateInfo = emailTemplate[emailAction];

        if (!templateInfo) {
            throw new CError('wrong email action', 500);
        }

        context.frontendURL = config.FRONTEND_URL;

        return transporter.sendMail({
            to: userEmail,
            subject: templateInfo.subject,
            template: templateInfo.template,
            context,
        })
    },
}