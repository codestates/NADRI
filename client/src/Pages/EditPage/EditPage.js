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
  CheckboxContainer} from './StyledEditPage'
import Preview from "../../components/PostPage/Preview";
import PreviewBottom from "../../components/PostPage/PreviewBottom";
import {useNavigate, useLocation} from 'react-router-dom'

export default function EditPage () {
  const navigate = useNavigate()
  const location = useLocation()
  const [loc, setLoc] = useState({
    lat: 0,
    lng: 0,
    address: '',
  })

  const [value, setValue] = useState({
    // 정보 저장하는 state
    image: [],
    title: '',
    content: '',
    public: false,
    categoryId: 1,
  });

  const picChange = (event) => {
    // 이미지를 추가하는 함수
    // 나는 Blob이 싫다
    let urlArr = [...value.image],
      image = event.target.files;

    if (urlArr.length + image.length > 4) return alert('이미지는 4장까지 첨부 가능합니다!')

    let inputSize = 0, useSize = 0

    for (let i of image) inputSize += i.size

    urlArr.map(e => useSize += e[1].size)

    if (inputSize + useSize > 5000000) {
      alert('이미지는 5mb까지 첨부 가능합니다')
      return null
    }

    for (let i = 0; i < image.length; i++) {
      const imageUrl = URL.createObjectURL(image[i], `${image[i].name}`, {
        type: `image`,
      });
      urlArr.push([imageUrl, event.target.files[i]]);
    }
    
    handleValue({ id: "image", value: urlArr });

  };

  const removeImg = (event, removeTarget) => {
    // 이미지를 제거하는 함수
    // splice함수 실행한 값을 할당하면 그 제거된 값만 저장된다.
    // 실행만 시키거나 다른 변수에 저장시켜야 함.
    // 그것도 싫다면 다른 함수를 적용해야 함
    // console.log(event.target.id, wtf)

    // const removeTarget = value.image[event.target.id]
    URL.revokeObjectURL(removeTarget[0]) // 먼저 blob 의 링크를 revoke
    const newImgArr = value.image.filter(e => {
      return e[0] !== removeTarget[0]
    })
    handleValue({id: 'image', value: [...newImgArr]})
  };

  const handleValue = (target) => {
      setValue({
        ...value,
        [`${target.id}`]: target.value,
      });
  };

  const handleLoc = (data) => {
    setLoc(data)
  }

  const submit = async () => {
    // 포스트 게시하는 함수
    const formData = new FormData();

    for (let i = 0; i < value.image.length; i++) {
      formData.append('image', value.image[i][1]);
    }
    formData.append('address', loc.address)
    formData.append('lat', loc.lat)
    formData.append('lng', loc.lng)

    const val = Object.keys(value);
    for (let i = 0; i < val.length; i++) {
      if (val[i] === 'image') continue
      formData.append(`${val[i]}`, value[val[i]]);
    }

    // http:/ / localhost:8080 / edit / {id}
    let endPoint = window.location.href.split('/')[4]

    axios({
      method: 'PATCH',
      url: `${process.env.REACT_APP_API_URL}/post/${endPoint}`,
      data: formData, // 어떤 레퍼런스는 files로 하던데 죽어도 안되서 변경
      headers: { 'content-type': 'multipart/form-data' },
    })
      .then((result) => {
        console.log(result);
        navigate('/') // 리턴된 페이지로 이동?
      })
      .catch((error) => {
        console.log(error);
        alert('문제가 발생했습니다!')
      })
      
      // 데이터 출력 테스트
      for (let value of formData.values()) {
        console.log(value);
      }


  };

  useEffect(async () => {
    let postData = await axios.get(`${process.env.REACT_APP_API_URL}/post/${window.location.href.split('/')[4]}`)
    postData = postData.data.data

    console.log('POST', postData)

    const download = []
    for (let i = 0; i < postData.image.length; i++) {
      let blobData = await axios({ // 응답 전체를 저장
        method: 'GET',
        url: postData.image[i],
        responseType: 'blob',
        withCredentials: false,
        headers: {'Access-Control-Allow-Origin': 'http://localhost:3000'}
      })
      const convertFile = new File([blobData.data], postData.image[i].split('/')[3], {type: blobData.data.type})

      let imgUrl = URL.createObjectURL(blobData.data)
      download.push([imgUrl, convertFile])
    }

    console.log(download)

    // 게시글의 내용을 state에 저장
    setValue({
      image: download,
      title: postData.title,
      content: postData.content,
      public: postData.public,
      categoryId: postData.categoryId
    })

    // 여기서는 지오로케이션이 필요가 없음(어차피 저장된 위치 가지고 수정하는거니까)
    kakaoInit([postData.lat, postData.lng])
  }, []);

  const geocoder = new kakao.maps.services.Geocoder();

  // 주소 받아오는 함수
  const setAddress = (locData) => {
    geocoder.coord2Address(
      locData.getLng(),
      locData.getLat(),
      function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          handleLoc({lat: locData.Ma, lng: locData.La, address: result[0].address.address_name});
        }
      }
    );
  };

  const kakaoInit = async ([lat, lng]) => {
    // 지도 생성
    const map = new kakao.maps.Map(document.getElementById('map'), {
      center: new kakao.maps.LatLng(lat, lng),
      level: 5,
    });
    map.addControl(
      new kakao.maps.ZoomControl(),
      kakao.maps.ControlPosition.RIGHT
    );

    // 마커 생성
    let marker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(lat, lng),
    });
    // 마커를 지도에 표시
    marker.setMap(map);

    // 수정: 온클릭 이벤트로 위치 정보를 수정
    kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
      // 클릭한 위도, 경도 정보를 가져옵니다
      let latlng = mouseEvent.latLng;
      // 마커 위치를 클릭한 위치로 이동 + 주소 출력
      marker.setPosition(latlng);
      setAddress(new kakao.maps.LatLng(latlng.Ma, latlng.La))
    });

    setAddress(new kakao.maps.LatLng(lat, lng))
    
  }


  return (

    <PostContainer>

      <TopContainer>
        <UploadContainer>
          <Preview Img={value.image} picChange={picChange} removeImg={removeImg} />
          <PreviewBottom Img={value.image} picChange={picChange} removeImg={removeImg} />
        </UploadContainer>
        <div id="map"></div>
      </TopContainer>

      <BottomContainer>
        <TextInputContainer>
          <input id="title" value={value.title} onChange={(event) => handleValue(event.target)} />
        
          <pre><textarea id="content" rows="10" cols="50" value={value.content} onChange={(event) => handleValue(event.target)} /></pre>
        </TextInputContainer>

        <CheckboxContainer>
          <div>
            <button onClick={submit}>업로드</button>
          </div>

          <div className="checkbox">
            <input
              type="checkbox"
              onClick={() => handleValue({ id: "public", value: !value.public })}
              value={value.public}
            />
            <span>{value.public ? "공개" : "비공개"}</span>
          </div>

          <div className="category">
            <select
              value={value.categoryId}
              className="w150"
              onChange={(e) =>
                handleValue({ id: "categoryId", value: Number(e.target.value) })
              }
            >
              <option value={1}>테스트</option>
              <option value={2}>여행</option>
              <option value={3}>카페</option>
              <option value={4}>맛집</option>
              <option value={5}>산책</option>
            </select>
          </div>

        <div>
          <button onClick={() => console.log(value, loc)}>ㅡㅡ</button>
          <span>{loc.address}</span>
        </div>
      </CheckboxContainer>
      </BottomContainer>
    </PostContainer>
  );
}