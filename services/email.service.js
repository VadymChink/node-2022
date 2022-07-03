const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require("path");

const {config} = require("../constants");
const emailTemplate = require('../email-templates');
const {CError} = require("../errors");

module.exports = {
    sendEmail: (userEmail = '', emailAction = '', context = {}) => {
        const transporter = nodemailer.createTransport({
            from: 'no reply',
            auth: {
                user: config.NO_REPLY_EMAIL,
                pass: config.NO_REPLY_EMAIL_PASSWORD,
            },
            service: 'gmail'
        })

        const exphbsOptions = {
            viewEngine: {
                extname: '.hbs',
                defaultLayout: 'main',
                layoutsDir: path.join(process.cwd(), 'email-templates', 'layouts'),
                partialsDir: path.join(process.cwd(), 'email-templates', 'partials'),
            },
            viewPath: path.join(process.cwd(), 'email-templates', 'views'),
            extName: '.hbs',
        }

        transporter.use('compile', hbs(exphbsOptions));

        const templateInfo = emailTemplate[emailAction];

        if (!templateInfo) {
            throw new CError('Wrong email action', 500);
        }

        context.frontendURL = config.FRONTEND_URL;

        return transporter.sendMail({
            to: userEmail,
            subject: templateInfo.subject,
            template: templateInfo.template,
            context
        })
    },
}