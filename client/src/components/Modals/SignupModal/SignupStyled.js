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
  &::-webkit-scrollbar {
    display: none;
  }
`

export const SignupModalView = styled.div`
  width: 33rem;
  height: 50rem;
  background-color: white;
  border-radius: 10px;
  padding: 35px 80px;
  position: relative;
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
  }

  > h1 {
    font-size: 2.3rem;
    font-weight: 500;
    margin-bottom: 1.5rem;
  }

  > p {
    color: #868e96;
    > span {
      color: hotpink;
      cursor: pointer;
    }
  }
`;

export const ModalInput = styled.div`
  margin: 2rem 0 1rem;
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
        }
      }
    }
  }
`

export const Oauth = styled.div`
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
    box-shadow: rgb(0 0 0 / 10%) 0px 0px 10px;
    position: relative;
    cursor: pointer;
    img {
      position: absolute;
      left: 10px;
      width:30px;
    }
    button {
      width: 100%;
      height: 100%;
      border-radius: 5px;
      font-size: 20px;
      font-weight: 700;
      border: 0;
      outline: 0;
      color: rgb(73, 80, 87);
    }
  }

  & > div:first-child {
    background-color: pink;
    color: white;
  }

  & > div:nth-child(2) {
    button {
      background: rgb(255,255,255);
    }
  }

  & > div:last-child {
    /* background-color: rgb(255, 231, 16) */
    button{
      background-color: rgb(255, 231, 16)
    }
  }
`