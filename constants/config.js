module.exports = {
    DB_URL: process.env.DB_URL || 'localhost27017/test',
    SERVER_PORT: process.env.SERVER_PORT || 3000,

    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'sjk',
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'sfg',

    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL || 'ia@gmail.com',
    NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD || 12354,

}