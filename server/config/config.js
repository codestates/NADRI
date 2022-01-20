const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    development: {
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      host: process.env.DATABASE_HOST,
      dialect: 'mysql',
      dialectOptions: {charset: "utf8mb4", dateStrings: true, typeCast: true},
      // port:process.env.DATABASE_PORT,
      timezone: '+09:00'
    },
    test: {
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      host: process.env.DATABASE_HOST,
      dialect: 'mysql',
      port:process.env.DATABASE_PORT
    },
    production: {
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      host: process.env.DATABASE_HOST,
      dialect: 'mysql',
      port:process.env.DATABASE_PORT
    }
  
}