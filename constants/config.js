module.exports = {
    URL_DB: /*process.env.URL_DB ||*/ 'mongodb://localhost:27017/users',
    SERVER_PORT: process.env.SERVER_PORT || 3000,

    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'sjk',
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'sfg',

    FORGOT_PASS_ACTION_SECRET: process.env.FORGOT_PASS_ACTION_SECRET || 'sdfjkf',

    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL || 'ia@gmail.com',
    NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD || 12354,

    FRONTEND_URL: process.env.FRONTEND_URL || 'df.com',

    AWS_S3_BUCKET: process.env.AWS_S3_BUCKET,
    AWS_S3_REGION: process.env.AWS_S3_REGION,
    AWS_S3_ACCESS_KEY: process.env.AWS_S3_ACCESS_KEY,
    AWS_S3_SECRET_KEY: process.env.AWS_S3_SECRET_KEY,
    AWS_S3_BUCKET_URL:process.env.AWS_S3_BUCKET_URL,
}