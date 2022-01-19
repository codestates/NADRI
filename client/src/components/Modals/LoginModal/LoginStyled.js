import styled from "styled-components";

export const ModalBackdrop = styled.div`
  width: 100vw;
  height: 100%;
  position: fixed;
  top:0;
  left:0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0,0,0,0.4);
  text-align: center;
  overflow: scroll;
  z-index: 999;
  font-family: 'NanumSquare',arial;
  &::-webkit-scrollbar {
    display: none;
  }
`

export const LoginModalView = styled.div`
  width: 33rem;
  height: 38rem;
  background-color: white;
  border-radius: 10px;
  padding: 35px 80px;
  position: relative;

  @media (max-width: 650px){
    width: 80vw;
    padding: 35px 30px;
    height: 60vh;
  }
`

export const ModalLogo = styled.div`
  >div {
    width: 20rem;
    margin: 0 auto 1rem;
    .mainLogo {
      display: block;
      width: 100%;
      height: auto;
    }
    .mobileLogo{
      display: none;
    }
  }

  @media (max-width: 650px){
    >div {
      display: flex;
      justify-content: center;
      width: auto;

      .mainLogo {
        display: none;
      }
      .mobileLogo{
      display: flex;
      width: 4rem;
      height: auto;
      }
    }
  }
`

export const ModalHead = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > span {
    position: absolute;
    padding: 0.5rem 0.7rem;
    top: 0;
    right: 0;
    font-size: 1.5rem;
    cursor: pointer;
    font-family: arial;
  }

  > h1 {
    font-size: 2.3rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
  }

  > p {
    color: #868e96;
    > span {
      color: hotpink;
      cursor: pointer;
    }
    > br {
      display: none;
    }
    @media screen and (max-width:650px){
      > br {
      display: flex;
      }
    }
  }
`;

export const ModalInput = styled.div`
  margin: 2rem 0 1rem;

  > form {
    > label {
      text-align: left;
      display: block;
      margin-bottom: 1rem;
    }

    > input {
      width: 100%;
      border-radius: 5px;
      height: 2.5rem;
      border: 2px solid rgb(233, 236, 239);
      outline: none;
      padding-left: 10px;
      margin-bottom: 1rem;

      :focus {
        border: 1px solid #ff7400;
      }
    }
  }
`

export const Oauth = styled.div`
  display: flex;
  flex-wrap: wrap;
  > div {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 3.5rem;
    margin-bottom: 0.8rem;
    border-radius: 5px;
    font-size: 20px;
    /* color: rgb(73, 80, 87); */
    font-weight: 700;
    /* box-shadow: rgb(0 0 0 / 10%) 0px 0px 10px; */
    position: relative;
    cursor: pointer;
  
    .normalLogin{
      width: 100%;
      background-color: pink;
      color: white;
      height: 3.5rem;
      border-radius: 7px;
      line-height: 3.5rem;

    }
   
  }

  & > div:first-child {
    padding: 0.3rem;
  }

> span {
  width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 3.5rem;
    margin-bottom: 0.8rem;
    border-radius: 5px;
    font-size: 20px;
    /* color: rgb(73, 80, 87); */
    font-weight: 700;
    /* box-shadow: rgb(0 0 0 / 10%) 0px 0px 10px; */
    position: relative;
    cursor: pointer;

    .googlePcLogin{
      width: 100%;
      height: 3.5rem;
    }
    .googleMobile{
      display: none;
    }
    .kakaoPcLogin{
      width: 100%;
      height: 3.5rem;
    }
    .kakaoMobile{
      display: none;
    }
}

  & > span:last-child {
    padding: 0.3rem;
  }

  @media (max-width: 650px){
    display: flex;
    justify-content: space-around;
    > div {
      .normalLogin{
        height: 2.5rem;
        line-height: 2.5rem;
      }
    }

    & > div:first-child {
    padding: 0.3rem;
    width: 50%;
   }

  > span {
    display: flex;
    width: 20%;
    .googlePcLogin{
        display: none;
      }
      .kakaoPcLogin{
        display: none;
      }
      .googleMobile{
      display: flex;
      }
      .kakaoMobile{
      display: flex;
      }
  }

  & > span:last-child {
    padding: 0.3rem;
   }
  }

`