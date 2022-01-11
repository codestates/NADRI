import React from "react";
import styled from "styled-components";



const ItemContainer = styled.div`
  height: 10rem;
  display: flex;
  border: 1px solid black;
  margin-bottom: 3rem;
  padding: 1rem;
  gap: 2rem;

  & {
    .img {
      transition: transform 0.2s linear;
      transform: scale(1);
    }
  }

  &:hover {
    .img {
      transition: all 0.2s linear;
      border:none;
      transform: scale(1.4);
    }
  }
`

const ItemImg = styled.div`
  width: 8rem;
  border: 1px solid black;
  border-radius: 5px;

  ${(props) => {
    return (
      `
      background-image: url(${props.img});
      background-size: cover;
      `
    )
  }}
`

const ItemInfo = styled.div`
  width: 20rem;
  cursor: grab;
  .title {
    display: flex;
    align-items: center;
    width: 100%;
    height: 2rem;
    border: 1px solid black;
    border-radius: 5px;
    margin-bottom: 1rem;
    padding: 0.2rem 0.2rem;
  }

  .desc {
    height: 5rem;
    border-radius: 5px;
    border: 1px solid black;
    padding: 0.2rem 0.2rem;
  }
`

export default function Item ({point}) {
  return (
      <ItemContainer>
        <ItemImg className="img" img={point.image[0]}>
        </ItemImg>

        <ItemInfo>
          <div className="title">{point ? point.title : null}</div>
          <div className="desc">{point ? point.content : null}</div>
        </ItemInfo>
      </ItemContainer>
  )
}