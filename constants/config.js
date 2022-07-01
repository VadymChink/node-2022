module.exports = {
    URL_DATA_BASE: process.env.DB_URL || 'mongodb://localhost27017/users',
    SERVER_PORT: process.env.SERVER_PORT || '5100',

    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'asd',
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'qwe',

    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL || 'email@gmail.com',
    NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD || 1245,
}