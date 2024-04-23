import React from "react";
import DropGallery from "./DropGallery";
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
`;

const Cover = styled.div`
    display: flex;
`;

const CoverImg = styled.img`
    max-width: 100%;
    height: auto;
`;

const Desc = styled.button`
    font-size: 20px;
    padding: 5px 20px 5px 20px;
    border-style: solid;
    border-width: 1px;
    border-color: #1E4620;
    &:hover {
        color: #1E4620;
        background-color:#C9BDAC;
      }
    background-color: #1E4620;
    border-radius: 4px;
`;

const Spacer = styled.div`
    padding: 10px;
    display: flex;
    justify-content: center;
`;

function NewDrop() {
    const images = [
        "./assets/dropgalllery/andy1.png",
        "./assets/dropgalllery/andy2.png",
        "./assets/dropgalllery/ronan2.png",
        "./assets/dropgalllery/ronan3.png",
        "./assets/dropgalllery/ronan4.png",
      ]
    return(
        <div>
            <Wrapper>
                <Cover>
                    <CoverImg src="./assets/dropcover/ronan.png" alt="" />
                </Cover>
            </Wrapper>
            <Spacer>
                <Desc>SHOP SPRING/24</Desc>
            </Spacer>
            <DropGallery images={images}/>
        </div>
    )
}

export default NewDrop;