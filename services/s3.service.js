const s3 = require('aws-sdk/clients/s3');
const path = require("path");
const uuid = require("uuid").v4;

const {config} = require("../constants");

const BucketConfig = new s3({
    region: config.AWS_S3_REGION,
    accessKeyId: config.AWS_S3_ACCESS_KEY,
    secretAccessKey: config.AWS_S3_SECRET_KEY,
})

const uploadFile = (file, itemType, itemId) => {
    const Key = _buildFilePath(file.name, itemType, itemId);

    return BucketConfig.upload({
        Bucket: config.AWS_S3_BUCKET,
        Key,
        ContentType: file.mimetype,
        ACL: 'public-read',
        Body: file.data,
    })
        .promise();
};

const updateFile = (file,fileURL) => {
    const Key = fileURL.split(config.AWS_S3_BUCKET_URL).pop();

    return BucketConfig.putObject({
        Bucket: config.AWS_S3_BUCKET,
        Key,
        ContentType: file.mimetype,
        ACL: 'public-read',
        Body: file.data,
    })
        .promise();
};

module.exports = {
    uploadFile,
    updateFile
}

function _buildFilePath(fileName, itemType, itemId) {
    const ext = path.extname(fileName);

    return `${itemType}/${itemId}/${uuid()}${ext}`
}