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

  a {
    color: rgb(206, 212, 218);
    text-decoration: none;
  }

  a:hover {
    color: #05050f;
    transition: all 0.1s;
  }

  &>:last-child {
    margin-left: 76px;
  }
`

const Logo = styled.div`
  width: 15rem;
  margin: 0;

  > a {
    width: 20rem;
    height: auto;
  }

  > a img {
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
`

const Profile = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;

  & >:first-child {
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
    }

    .info {
      font-size: 14px;
      font-weight: 300;
      line-height: 1rem;
    }
  }
`

function moveTop () {
  window.screenTop(0, 0)
}



export default function Footer () {
  return (
    <FooterContainer>
      <Logo>
        <Link to="/">
          <img src="NADRI.png" alt="footer-logo" />
        </Link>
      </Logo>

      <MemberContainer>
        <Profile>
          <div><a href='https://github.com/LeeTaeGwan' target={"_blank"}><img src='gitHubLogo.png'/></a></div>
          <div><span className='name'>이태관</span> <span className='info'>Front end<br/> freshman1998 @ naver.com</span></div>
        </Profile>
        <Profile>
          <div><a href='https://github.com/LittleBiber' target={"_blank"}><img src='gitHubLogo.png'/></a></div>
          <div><span className='name'>김상형</span> <span className='info'>Back end<br/> rlatkdgud98 @ naver.com</span></div>
        </Profile>
        <Profile>
          <div><a href='https://github.com/racyde' target={"_blank"}><img src='gitHubLogo.png'/></a></div>
          <div><span className='name'>이상민</span> <span className='info'>Back end<br/> racyde @ naver.com</span></div>
        </Profile>
      </MemberContainer>

      <Profile>
          <div><a href='https://github.com/codestates/NADRI' target={"_blank"}><img src='gitHubLogo.png'/></a></div>
          <a href='https://github.com/codestates/NADRI' target={"_blank"}>NADRI GitHub Repository</a>
      </Profile>
    </FooterContainer>
  )
}