import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import { useParams, useLocation, useMatch } from 'react-router-dom'
import dummy from '../assets/dummy'


const DetailPageContainer = styled.div`
    padding: 3rem 9vw;
    display: flex;
    height: 100%;
    /* flex-direction: column; */
    flex-wrap: wrap;
    justify-content: space-around;
    /* align-content: flex-start; */

`

const fontsize = {
    Titlefontsize: '1.5em',
    // Titlefontweight: 
}

const Title = styled.h2`

    width: 100%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 5%;
    margin-top: 5%;
    padding: 1rem;
    color: black;
    font-size: ${fontsize.Titlefontsize};
    font-weight: bold;
    text-align: center;
    `

const ImgContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-basis: 500px;
    /* width: 500; */
    height: auto;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 5%;
    /* box-shadow: 4px 4px 4px rgb(100, 100, 100); */
    /* transition: box-shadow 0.1s, transform 0.1s; */

.mainImg {
    border: 1px solid black;
    border-radius: 10px;
    margin-bottom: 1rem;

}

.imgThumbnail {
    border: 1px solid black;
    border-radius: 10px;
    padding: 1rem;

}

`
const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid black;
    border-radius: 10px;
    flex-basis: 500px;
    height: auto;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 5%;

.contentDesc {
    border: 1px solid black;
    border-radius: 10px;
    margin-left: 1rem;
    margin-right: 1rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
    padding: 1rem;
}

.contentToolbar {
    border: 1px solid black;
    border-radius: 10px;
    margin-left: 1rem;
    margin-right: 1rem;
    margin-bottom: 1rem;
    padding: 1rem;
}
`

const MapContainer = styled.div`
    display: flex;
    flex-basis: 500px;
    border: 1px solid black;
    border-radius: 10px;
    height: auto;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 5%;
`

const CommentListContainer = styled.div`
    display: flex;
    flex-basis: 500px;
    border: 1px solid black;
    border-radius: 10px;
    height: auto;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 5%;
`


export default function DetailPage ( ) {
    
    const location = useLocation()
    console.log(location)

    const [data, setData] = useState({})
    
    const { id, image, content, title } =location.state

    // 추후 api 요청시 dummy 부분의 변경등 필요
    const  getItemByNo = (id) => {
        const arr = dummy.filter((item) => item.id === id)
        if(arr.length){
            return arr[0]
        }
        return null
    }

    useEffect( () => {
        setData(getItemByNo(id))
    },[])


    return(
        <DetailPageContainer>
            {/* {
            data ? ( */}
            {/* <div> */}
            
                <Title>
                    {title}
                </Title>
            
                <ImgContainer>
                    <div className="mainImg">
                        <img src={image[0]}></img>
                    </div>
                    <div className="imgThumbnail">
                        <span>이미지 썸네일 공간</span>
                    </div>
                </ImgContainer>
                <ContentContainer>
                    <div className="contentDesc">
                        {content}
                    </div>
                    <div className="contentToolbar">
                        <span>컨텐츠 툴바 들어갈 자리</span>
                    </div>
                </ContentContainer>
                <MapContainer>
                    맵 컨테이너
                </MapContainer>
                <CommentListContainer>
                    코멘트리스트 컨테이너
                </CommentListContainer>
            {/* </div>   */}
             {/* )   
            : ('해당 상세 내용이 없습니다') 
            } */}
        </DetailPageContainer>
    )

}