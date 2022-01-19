import styled from "styled-components";

export const PostContainer = styled.div`
  padding: 3rem 9vw;
  width: 100%;
  height: 100%;
`

export const Container = styled.div`
  width: 100%;
  // border: 1px solid black;
  padding: 1rem;
  /* background-color: #dfe3ee; */
  border-radius: 10px;
  /* box-shadow: 3px 3px 4px 3px rgb(180 180 180); */
  font-family: 'NanumSquare','Cafe24', arial;
  background: #f9fafc;
`

export const TopContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 3em;
  gap: 3em;

  #map {
    width: 50%;
    z-index: 1;
    border-radius: 15px;
    box-shadow: 3px 3px 4px 3px rgb(180 180 180);
    // border: 1px solid black;
  }

  @media (max-width: 767px) {
    flex-direction: column-reverse;

    #map {
      width: 100%;
      height: 15rem;
    }
  }
`

export const UploadContainer = styled.div`
  width: 50%;
  height: 35vw;
  // border: 1px solid black;
  padding: 1rem 2rem;
  border-radius: 10px;
  box-shadow: 3px 3px 4px 3px rgb(180 180 180);

  @media (max-width: 767px) {
    width: 100%;
    height: 15rem;
  }
`

export const BottomContainer = styled.div`
  width: 100%;
  display: flex;
  // background-color: white;
  // padding: 1rem;

  @media (max-width: 767px) {
    flex-direction: column;
  }
`

export const TextInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  label {
    margin-bottom: 3em;
    font-size: 1.4rem;
  }

  #title {
    width: 100%;
    height: 40px;
    margin: 10px 0 20px;
    padding-left: 10px;
    border: 0px solid rgb(150, 150, 150);
    border-radius: 20px;
    box-shadow: 2px 2px 2px 1px rgb(180 180 180);
    background: #fdfdff;
  }
  
  #title:focus {
    outline:none;
    border: 1px solid #ff7400;
  }

  textarea {
    margin-top: 10px;
    width: 60vw;
    height: 80px;
    padding: 10px;
    resize: none;
    border: 0px solid rgb(150, 150, 150);
    border-radius: 20px;
    box-shadow: 2px 2px 2px 1px rgb(180 180 180);
    overflow: auto;
    background: #fdfdff;
  }

  textarea:focus {
    outline: none;
    border: 1px solid #ff7400;
  }

  @media (max-width: 767px) {
    textarea {
      width: 100%;
      margin-bottom: 1.5rem;
    }
  }
`

export const CheckboxContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  margin-left: 4vw;
  gap: 15%;

  #category-container {
    display: flex;
    flex-direction: column;
    label {
      font-size: 1.1rem;
      margin-right: 1em;
      margin-bottom: 0.3rem;
    }

    select {
      text-align: center;
      width: 6rem;
      height: 1.5rem;
      font-family: 'NanumSquare', arial;
      :hover {
        color: #ff7400;
      }
    }
  }

  #Btn {
    width: 100%;
    height : 50px;
    border-radius: 8px;
    max-width: 80%;
    border: none;
    background-color: #f6d9d5;
    box-shadow: 2px 2px 2px 1px rgba(180, 180, 180);
    cursor: pointer;
    font-size: 1rem;
    font-family: 'NanumSquare', arial;
  }

  #Btn:active {
    box-shadow: 4px 4px 4px 1px rgba(180, 180, 180);
  }

  #Btn:active {
    position: relative;
    top: 2px;
  }

  @media (max-width: 992px) {
    // border: 1px solid black;
    width: 100%;
    height: 100%;
    margin-left: 2rem;
    gap: 1rem;

    #category-container {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      label {
        /* margin: 0 auto;
        margin-bottom: 10px; */
        display: flex;
      }
    }

    #address {
      width: 100%;
      display: flex;
      flex-direction: column;
      // justify-content: center;
      // align-items: center;

      label {
        margin: 0 auto;
        margin-bottom: 10px;
      }

      span {
        font-size: 0.9rem;
        line-height: 1rem;
      }
    }
    
    .checkbox {
      width: 100%;
      display: flex;
      justify-content: center;

      label {
        display: none;
      }
    }

    #Btn {
      width: 100%;
      max-width: 100%;
    }
  }

  @media (max-width: 767px) {
    margin-left: 0;

    #category-container {
      border-bottom: 1px solid gray;
      padding-bottom: 1rem;
      flex-direction: row;
    }


    #address {
      border-bottom: 1px solid gray;
      padding-bottom: 1rem;
      label {
        font-size: 1.1rem;
      }
      span {
        text-align: center;
      }
    }
  }
`