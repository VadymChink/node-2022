const nodemailer = require('nodemailer');
const EmailTemplate = require('email-templates');
const path = require('path');

const {config} = require("../constants");
const emailTemplate = require('../email-templates');
const {CError} = require("../errors");

module.exports = {
    sendEmail: async (userEmail = '', emailAction = '', locals = {}) => {
        const templateParser = new EmailTemplate({
            views: {
                root: path.join(process.cwd(), 'email-templates')
            }
        });
        const transporter = nodemailer.createTransport({
            auth: {
                user: config.NO_REPLY_EMAIL,
                pass: config.NO_REPLY_EMAIL_PASSWORD,
            },
            service: 'gmail'
        })

        const templateInfo = emailTemplate[emailAction];

        if (!templateInfo) {
            throw new CError('Wrong email action', 500)
        }

        locals.frontendURL = ' https://i.ytimg.com/vi/1Ne1hqOXKKI/maxresdefault.jpg';
        const html = await templateParser.render(templateInfo.template, locals);

        return transporter.sendMail({
            from: 'no reply',
            to: userEmail,
            subject: templateInfo.subject,
            html,
        })

    },
}