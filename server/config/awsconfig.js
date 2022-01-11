const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    'accessKeyId': process.env.AWS_KEY,
    'secretAccessKey': process.env.AWS_SECRET,
    'region': process.env.AWS_REGION,
}