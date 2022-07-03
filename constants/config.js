module.exports = {
    URL_DB: process.env.DB_URL || 'mongodb+srv://VadymVinnichuk:1t2t3t4t5t@cluster0.jdrlr.mongodb.net/users',
    SERVER_PORT: process.env.SERVER_PORT || 5500,

    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'asd',
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'qwe',

    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL || 'mail@gmail.com',
    NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD || 'gjfmxnlpsnnojjbw',

    FRONTEND_URL: process.env.FRONTEND_URL || 'google.com'
}