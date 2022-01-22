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

export const SignupModalView = styled.div`
  width: 33rem;
  height: 45rem;
  background-color: white;
  border-radius: 10px;
  padding: 35px 80px;
  position: relative;

  @media (max-width: 650px){
    width: 80vw;
    padding: 35px 30px;
    height: 650px;
  }
`

export const ModalLogo = styled.div`
  >div {
    width: 20rem;
    margin: 0 auto 1rem;
    >img {
      display: block;
      width: 100%;
      height: auto;
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
      color: #88ccff;
      cursor: pointer;
      font-weight: bold;
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
  margin: 2rem 0 0;

  label {
    text-align: left;
    display: block;
    margin-bottom: 0.7rem;
  }

  input {
    width: 100%;
    border-radius: 5px;
    height: 2.5rem;
    border: 2px solid rgb(233, 236, 239);
    outline: none;
    padding-left: 10px;
    margin-bottom: 1rem;
    /* font-family: 'NanumSquare',arial; */
    :focus {
      border: 2px solid #88ccff;;
      }y
  }

  > form {
    .emailInput {
      >div {
        display: flex;
        justify-content: space-between;
        >input {
          width: 75%;
        }
        > button {
          width: 20%;
          border: 2px solid rgb(233, 236, 239);
          background-color: white;
          height: 2.5rem;
          border-radius: 5px;
          cursor: pointer;
          font-family: 'NanumSquare',arial;
          background-color: #88ccff;
          color: white;
          font-weight: bold;
          border: none;
          box-shadow: rgb(0 0 0 / 10%) 2px 5px 10px;
        }
        > button:active {
          position: relative;
          top: 2px;
        }
      }
    }
    &>:last-child {
      margin-bottom: 0;
    }
  }

  #loadingContainer {
    width: 100%;
    height: 3rem;
  }
  
  #dangerMsg {
    display: inline-block;
    font-weight: 700;
    color: #ff3b30;
    letter-spacing: 1px;
    margin: 1rem 0;
  }
  #successMsg {
    display: inline-block;
    color: #13ce66;
    font-weight: 700;
    letter-spacing: 1px;
    margin: 1rem 0;
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
    color: rgb(73, 80, 87);
    font-weight: 700;
    // box-shadow: rgb(0 0 0 / 10%) 0px 0px 10px;
    position: relative;
    cursor: pointer;

    .normalSignup{
      width: 100%;
      background-color: #88ccff;
      color: white;
      height: 3.5rem;
      border-radius: 7px;
      line-height: 3.5rem;
      box-shadow: rgb(0 0 0 / 10%) 5px 5px 10px;
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
    // box-shadow: rgb(0 0 0 / 10%) 0px 0px 10px;
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
      box-shadow: rgb(0 0 0 / 10%) 5px 5px 10px;
    }
    .kakaoMobile{
      display: none;
    }
}


& > span:last-child {
    padding: 0.3rem;
  }

  & > div:active {
    position: relative;
    top: 2px;
  }

  & > span:active {
    position: relative;
    top: 2px;
  }

  @media (max-width: 650px){
    display: flex;
    justify-content: space-around;

    > div {
      .normalSignup{
        height: 2.5rem;
        line-height: 2.5rem;
        font-size: 1rem;
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
      box-shadow: rgb(0 0 0 / 10%) 5px 5px 10px;
      }
  }

  & > span:last-child {
      padding: 0.3rem;
    }
  }
`