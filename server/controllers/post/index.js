/*
  form을 통한 이미지 파일 업로드 테스트 파일
*/
const { posts } = require('../../models');

module.exports = async (req, res) => {
  // req.files > 이미지 정보 저장.
  // req.body > 텍스트가 저장된 필드 전부 (주의: 뭔지모를 객체 하나 있어서 req를 분해할당해야 활용에 지장 없을듯)
  console.log(req.files); // 파일의 정보 출력
  console.log(req.body);

  const image = req.files['image'];
  const path = image.map((img) => img.path);
  if (image === undefined) {
    return res.status(400).send('이미지가 존재하지 않습니다.');
  }

  console.log(path); // 배열 형태로 저장된 이미지 경로 출력

  res.status(200).send('요청 성공');
};
