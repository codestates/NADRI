const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const http = require('http');
const router = require('./router');
const server = http.createServer(app);
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    /* 나중에  추가하기 */
    // origin: true,
    origin: [`${process.env.CLIENT_URI}`],
    credentials: true,
    methods: ["GET", "POST", "OPTIONS", "DELETE"],
    /*세부 설정 오류시 수정 필요*/
  })
);

app.use(cookieParser());

app.use(router);

app.get('/', (req, res) => {
  res.send('Welcome to NADRI server!');
});

const HTTP_PORT = process.env.HTTP_PORT || 8080;


//  aws의 ALB Idle timeout은 60초보다 긴 65초, 66초로 설정
server.keepAliveTimeout = 65000;
server.headersTimeout = 66000;

// let server; 
app.listen(HTTP_PORT, () =>
    console.log(`http server runnning on port ${HTTP_PORT}`)
  );
// module.exports = server;