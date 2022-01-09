/*global kakao */
import axios from "axios";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  PostContainer,
  TopContainer,
  UploadContainer,
  BottomContainer,
  TextInputContainer,
  CheckboxContainer} from './StyledPostPage'
import Preview from "../../components/PostPage/Preview";
import PreviewBottom from "../../components/PostPage/PreviewBottom";

export default function PostPage () {

  const [value, setValue] = useState({ // posting할 post 데이터들
    title: "",
    content: "",
    lat: 0,
    lng: 0,
    address: "",
    public: false,
    categoryId: 1,
  });

  const handleValue = (target) => {
    // id가 loc이면 한번에 업데이트
    if (target.id === 'loc') {
      setValue({
        ...value,
        lat: target.lat,
        lng: target.lng,
        address: target.address
      })
    } else {
    setValue({
      ...value,
      [`${target.id}`]: target.value,
    })};
  };
// -----------------------------------------------------------------------
  // 미리보기 저장할 state
  const [previewImg, setPreviewImg] = useState([]); // 화면에 보이는 img를 인코딩한 값이 담긴 배열

  // 업로드할 이미지 state
  const [uploadImg, setUploadImg] = useState(null); // 서버에 보내야될 img가 담겨있는 FormData객체?

  const onChange = (event) => {
    const formData = new FormData()

    // 미리보기는 배열로 만들어 여러 장 저장 가능하게 구현
    if(event.target.files.length >=5) {
      alert('사진은 4개까지만 올릴 수 있어요 😢')
      return ;
    }
    
    for (let i = 0; i < event.target.files.length; i++) {
      previewImg.push(URL.createObjectURL(event.target.files[i]));
    }
    // 미리보기 state를 저장
    
    setPreviewImg(previewImg);

    /* ============================================== */
    
    // 이미지 개수만큼 반복해서 formData에 이미지를 저장
    for (let i = 0; i < event.target.files.length; i++) {
      formData.append("image", event.target.files[i]);
    }

    // state에 이미지 저장
    setUploadImg(formData);
  };
  // -----------------------------------------------------------------------

  const uploadImage = () => {
    const postData = uploadImg;

    const val = Object.keys(value);
    for (let i = 0; i < val.length; i++) {
      postData.append(`${val[i]}`, value[val[i]]);
    }

    axios({
      method: "post",
      url: "https://localhost:8443/post",
      data: postData, // 어떤 레퍼런스는 files로 하던데 죽어도 안되서 변경
      headers: { "content-type": "multipart/form-data" },
    })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    mapscript();
  }, []);

  const mapscript = () => {
    // 지도 생성
    let container = document.getElementById("map");
    let options = {
      center: new kakao.maps.LatLng(37.5655493, 126.9777104),
      level: 5,
    };
    const map = new kakao.maps.Map(container, options);

    // 추가: 지오코더 생성
    const geocoder = new kakao.maps.services.Geocoder();

    // 위치정보 설정 함수
    const setLocation = (locData) => {
      geocoder.coord2Address(
        locData.getLng(),
        locData.getLat(),
        function (result, status) {
          if (status === kakao.maps.services.Status.OK) {
            const address = result[0].address.address_name
            handleValue({id: 'loc', lat: locData.La, lng: locData.Ma, address})
          }
        }
      );
    }

    // 마커 생성
    let marker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(null, null),
    });

    // 마커를 지도에 표시
    marker.setMap(map);

    // 추가: 현재위치 가져오기
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(function (position) {
        let lat = position.coords.latitude; // 위도
        let lon = position.coords.longitude; // 경도
        const locPosition = new kakao.maps.LatLng(lat, lon);
        map.setCenter(locPosition);
        // 찾은 위치를 가지고 접속주소 설정
        setLocation(locPosition)
      });
    }
    // GeoLocation 실패로 위치값이 falsy하면 기본값을 적용(여기서는 주소값으로 판단)
    if (!value.address) {
      // 기본값을 가지고 접속위치 설정 (기본값 서울시청광장. 위치 뒤틀리면 고장난거)
      const locPosition = new kakao.maps.LatLng(37.56554934, 126.9777104);
      // 찾은 위치를 가지고 접속주소 설정
      setLocation(locPosition)
    }

    // 수정: 온클릭 이벤트로 위치 정보를 수정
    kakao.maps.event.addListener(map, "click", function (mouseEvent) {
      // 클릭한 위도, 경도 정보를 가져옵니다
      let latlng = mouseEvent.latLng;
      // 마커 위치를 클릭한 위치로 이동 + 주소 출력
      marker.setPosition(latlng);
      setLocation(latlng)
    });
  };
  return (
    <PostContainer>

      <TopContainer>
        <UploadContainer>
          <Preview Img={previewImg} onChange={onChange} setPreviewImg={setPreviewImg} setUploadImg={setUploadImg}/>
          <PreviewBottom Img={previewImg} onChange={onChange} setPreviewImg={setPreviewImg} setUploadImg={setUploadImg}/>
        </UploadContainer>
        <div id="map"></div>
      </TopContainer>

      <BottomContainer>
        <TextInputContainer>
          <input id="title" onChange={(event) => handleValue(event.target)} />
        
          <pre><textarea id="content" rows="10" cols="50" onChange={(event) => handleValue(event.target)} /></pre>
        </TextInputContainer>

        <CheckboxContainer>
          <div>
            <button onClick={uploadImage}>업로드</button>
          </div>

          <div className="checkbox">
            <input
              type="checkbox"
              onClick={() => handleValue({ id: "public", value: !value.public })}
            />
            <span>{value.public ? "공개" : "비공개"}</span>
          </div>

          <div className="category">
            <select
              className="w150"
              onChange={(e) =>
                handleValue({ id: "categoryId", value: e.target.value })
              }
              value={"1"}
            >
              <option value="1">테스트</option>
              <option value="2">여행</option>
              <option value="3">카페</option>
              <option value="4">맛집</option>
              <option value="5">산책</option>
            </select>
          </div>

        <div>
          <button onClick={() => console.log(value)}>ㅡㅡ</button>
          <span>{value.address}</span>
        </div>
      </CheckboxContainer>
      </BottomContainer>
    </PostContainer>
  );
}