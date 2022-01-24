// import React from 'react';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import {
  RandingContainer,
  Section,
  leftContainer,
  Section_Left_Desc,
  Section_Right_Desc,
  Section1_Left_Img,
  Section2_Right_Img,
  Section3_Left_Img,
  ImgSection,
  LastImg,
  FinalImg,
  TrickImg,
  TrickSection,
  LastSection
} from '../components/LandingPage/styledRanding';
import Footer from '../components/Footer'
import { Link } from 'react-router-dom';


export default function Landing () {
  const [scrollY, setScrollY] = useState(0) // 현재 스크롤 위치
  const [initHeight, setInitHeight] = useState(window.innerHeight) // 사용자의 브라우저 높이 값
  const [sectionHeight, setSectionHeight] = useState(initArray()) // section이 시작되는 값이 담긴 배열
  const [curSection, setCurSection] = useState(0) // 현재 랜딩 Section
  const sectionWidth = window.innerWidth
  // console.log(sectionHeight)

  // [975, 1950, 2925, 3900, ]
  function calcCurSection() {
    // console.log(sectionHeight[2]) // 2925
    // console.log(scrollY + sectionHeight[1]) // 1950 + Y
    // console.log(sectionHeight[1]) // 1950
    // 1950 > 975 + y > 975
    // 2925 > 1950 + y > 1950
    // console.log(sectionHeight[2] > scrollY + sectionHeight[1])
    // console.log(scrollY + sectionHeight[1] > sectionHeight[1])
    // console.log(curSection)
    if(sectionHeight[0] > scrollY + (initHeight*0.8) && scrollY + (initHeight*0.8) > 0) {
      setCurSection(0)
    }
    if(sectionHeight[1] > scrollY + (initHeight*0.8) && scrollY + (initHeight*0.8) > sectionHeight[0]) { // 어캐 하긴 했는데 왜 조건문이 이렇게 나온는거지...??...
      setCurSection(1)
    }
    if(sectionHeight[2] > scrollY + (initHeight*0.8) && scrollY + (initHeight*0.8) > sectionHeight[1]) {
      setCurSection(2)
    }
    if(sectionHeight[3] > scrollY + (initHeight*0.8) && scrollY + (initHeight*0.8) > sectionHeight[2]) {
      setCurSection(3)
    }
    if(scrollY + (initHeight*0.8) > sectionHeight[3]) {
      setCurSection(4)
    }
  }
  // console.log(curSection)
  // console.log(sectionHeight)
  // console.log(scrollY + sectionHeight[0])

  function initArray() {
    let init = [];

    for(let i = 1; i < 8; i++) {
      init.push(initHeight * i)
    }

    return init
  }

  function handleScroll() {
    setScrollY(window.scrollY)
    
  }

  useEffect(() => {
    calcCurSection()
    // console.log(curSection)
  },[scrollY])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    
    // return () => {
    //   window.removeEventListener('scroll', handleScroll)
    // }
  })


  return (
    <RandingContainer>
      {/* 1------------------------------------------------------------------------------------ */}
      <Section initHeight={initHeight}>
        <Section_Left_Desc>
          <p>
            나만아는 좋은 곳을 다른 사람과 공유해보세요!
          </p>
          <span>NADIR</span>
          {/* 여기 바로시작하기 넣고 손가락 넣은다음에 계속 애니메이션 */}
          <button className='Btn'><Link to={'/'}>시작하기</Link></button>
          <img id='moveBus' src='img/nadri-logo-small.png' />
        </Section_Left_Desc>
      </Section>

      {/* 2------------------------------------------------------------------------------------ */}
      <Section initHeight={initHeight}> {/* section의 길이를 세팅하기 위한 프롭스 */}
        <Section1_Left_Img scrollY={scrollY} sectionHeight={sectionHeight[1]} initHeight={initHeight} curSection={curSection} /> {/* section2의 길이를 세팅하기 위한 프롭스 */}

        <Section_Right_Desc>
          <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit tempora aliquid exercitationem perspiciatis, laboriosam minus aliquam eum eius temporibus quod?
          </p>
        </Section_Right_Desc>
      </Section>

      {/* 3------------------------------------------------------------------------------------ */}
      <Section initHeight={initHeight}>
        <Section_Left_Desc>
          <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit tempora aliquid exercitationem perspiciatis, laboriosam minus aliquam eum eius temporibus quod?
          </p>
        </Section_Left_Desc>
        <Section2_Right_Img curSection={curSection}/>
      </Section>

      {/* 4------------------------------------------------------------------------------------ */}
      <Section initHeight={initHeight}>
        <Section3_Left_Img curSection={curSection} /> {/* section2의 길이를 세팅하기 위한 프롭스 */}
        <Section_Right_Desc>
          <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit tempora aliquid exercitationem perspiciatis, laboriosam minus aliquam eum eius temporibus quod?
          </p>
        </Section_Right_Desc>
      </Section>

      {/* 5------------------------------------------------------------------------------------ */}
      <ImgSection initHeight={initHeight}>
        <LastImg img={'/img/asdf.jpg'} sectionHeight={sectionHeight}  scrollY={scrollY} initHeight={initHeight} />
      </ImgSection>

      {/* 6------------------------------------------------------------------------------------ */}
      <ImgSection initHeight={initHeight}>
        <FinalImg scrollY={scrollY} initHeight={initHeight} sectionHeight={sectionHeight} />
      </ImgSection >

      <TrickSection initHeight={initHeight}>
        <TrickImg scrollY={scrollY} initHeight={initHeight} sectionHeight={sectionHeight} />
      </TrickSection>

      {/* 7------------------------------------------------------------------------------------ */}
      <LastSection initHeight={initHeight}>
        <p>
          나들이 한번 떠나보시겠어요?
        </p>
        <button><Link to={'/'}>시작하기</Link></button>
      </LastSection>
      
      {/* <Footer /> */}
    </RandingContainer>
  )
}