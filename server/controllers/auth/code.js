const nodemailer = require('nodemailer');
require('dotenv').config();

module.exports = async (req, res) => {
  // 이메일 주소와 비밀번호는 env에 저장
  const EMAIL = process.env.NODEMAILER_USER;
  const EMAIL_PW = process.env.NODEMAILER_PASS;

  // 타겟 이메일 추출
  let receiverEmail = req.body.email;
// console.log(receiverEmail)
  // Nodemailer transport를 생성
  let transport = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    secure: true,
    auth: {
      user: EMAIL,
      pass: EMAIL_PW,
    },
  });

  // 인증용 랜덤 문자열 생성
  const randomStr = Math.random().toString(36).slice(2, 11);

  // 전송할 메일 내용 작성
  await transport.sendMail(
    {
      from: 'NADRI Team',
      to: receiverEmail,
      subject: 'NADRI 가입을 위한 인증번호입니다.',
      html: `
            <h1>인증번호는 ${randomStr} 입니다.</h1>
        `,
    },
    function (err, info) {
      //에러 발생시 오류 로그 및 응답 반환
      if (err) {
        console.log(err);
        return res.status(400).json({ message: 'Check email address' });
      }
      console.log(`Email Sent: ${info.response}`);
      res.status(200).json({ code: randomStr });
      transport.close();
    }
  );
};
