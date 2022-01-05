const express = require('express');
const app = express();
// const port = 8443
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const https = require('https');
const router = require('./router');
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    /* 나중에  추가하기 */
    origin: ["http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "OPTIONS"],
    /*세부 설정 오류시 수정 필요*/
  })
);

app.use(cookieParser());

app.use(router);

app.get('/', (req, res) => {
  res.send('Welcome to NADRI server!');
});

const HTTPS_PORT = process.env.HTTPS_PORT || 8080;

let server;
if (fs.existsSync('./key.pem') && fs.existsSync('./cert.pem')) {
  const privateKey = fs.readFileSync(__dirname + '/key.pem', 'utf8');
  const certificate = fs.readFileSync(__dirname + '/cert.pem', 'utf8');
  const credentials = { key: privateKey, cert: certificate };

  server = https.createServer(credentials, app);

  server.listen(HTTPS_PORT, () =>
    console.log(`https server runnning on port ${HTTPS_PORT}`)
  );
} else {
  server = app.listen(HTTPS_PORT, () =>
    console.log(`http server runnning on port ${HTTPS_PORT}`)
  );
}

module.exports = server;