import React from "react";
import styled from 'styled-components';

const Wrapper = styled.div`
    align-items: center;
    display: flex;
`;

const Product = styled.div`
    display: flex;
    max-width: 50%;
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
    font-family: Oswald;
    background-color: #C9BDAC;
    display: flex;
    justify-content: center;
`;

function NewDrop() {
    return(
        <div>
            <Wrapper>
                <Product>
                    <img src="./assets/dropcover/ronan.png" alt="" />
                    <img src="./assets/dropcover/ronan2.png" alt="" />
                </Product>
            </Wrapper>
            <Spacer>
                <Desc className="cust-btn">SHOP S/24</Desc>
            </Spacer>
        </div>
    )
}

export default NewDrop;