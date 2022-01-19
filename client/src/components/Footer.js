import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

const FooterContainer = styled.footer`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #343a40;
  padding: 2rem 0;
  color: rgb(206, 212, 218);
  font-family: 'NanumSquare', arial;

  a {
    color: rgb(206, 212, 218);
    text-decoration: none;
  }

  &>:last-child {
    margin-left: 76px;
  }


  @media screen and (max-width:900px){
    &>:last-child  {
      margin-left: 0px
    }
  }
`

const Logo = styled.div`
  width: 15rem;
  margin: 0;
  img {
    display: block;
    width: 100%;
    height: auto;
  }
`

const MemberContainer = styled.div`
  width: 100%;
  max-width: 960px;
  height: 5rem;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8rem;
  align-items: center;
  margin: 2rem 0 1rem;
  border-top: 1px solid rgba(248, 249, 250, 0.1);

  @media screen and (max-width:900px){
    gap:1rem;
}
`

const Profile = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
  
  & >:first-child {
    transition: all 0.3s;
    width: 40px;
    height: 40px;
    margin-right: 1em;
    & a {
      width: 100%;
      & img {
        display: block;
        width: 100%;
        height: auto;
      }
    }
  }

  &>:last-child {
    .name {
      font-size: 16px;
      margin-right: 0.3rem;
    }

    .info {
      font-size: 14px;
      font-weight: 300;
      line-height: 1rem;
    }
  }
  
  .repo:hover {
    transition: all 0.3s;
    width: 60px;
    transform: translate(0, -45%);
  }
  .repo:active {
    transition: all 0.3s;
    position: relative;
    top: 3px;
  }

  @media screen and (max-width:900px){
    margin-top: 0rem;
   .info{
     display: none;
   }
   .repo:hover {
    width: 40px;
    }
  }
`





export default function Footer () {

  return (
    <FooterContainer>
      <Logo>
          <img src="/img/nadri-footer-img.png" alt="footer-logo" />
      </Logo>

      <MemberContainer>
        <Profile>
          <div className='repo'>
            <a href='https://github.com/LeeTaeGwan' target={"_blank"}>
              <img src='/img/gitHubLogo.png' alt=''/>
            </a>
          </div>
          <div>
            <span className='name'>
              이태관
            </span> 
            <span className='info'>
              Front end<br/> 
            freshman1998 @ naver.com
            </span>
          </div>
        </Profile>
        <Profile>
          <div className='repo'>
            <a href='https://github.com/LittleBiber' target={"_blank"}>
              <img src='/img/gitHubLogo.png'/>
            </a>
          </div>
          <div>
            <span className='name'>
              김상형
            </span> 
            <span className='info'>
              Back end<br/> 
              rlatkdgud98 @ naver.com
            </span>
          </div>
        </Profile>
        <Profile>
          <div className='repo'>
            <a href='https://github.com/racyde' target={"_blank"}>
              <img src='/img/gitHubLogo.png'/>
            </a>
          </div>
          <div>
            <span className='name'>
              이상민
            </span> 
            <span className='info'>
              Back end<br/> 
              racyde @ naver.com
            </span>
          </div>
        </Profile>
      </MemberContainer>

      <Profile>
          <div className='repo'>
            <a href='https://github.com/codestates/NADRI' target={"_blank"}>
              <img src='/img/gitHubLogo.png'/>
            </a>
          </div>
          <a href='https://github.com/codestates/NADRI' target={"_blank"}>
            NADRI GitHub Repository
          </a>
      </Profile>
    </FooterContainer>
  )
}