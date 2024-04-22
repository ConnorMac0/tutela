import React from "react";
import styled from 'styled-components';

const StyledHeader = styled.header`
    display: flex;
    font-family: Oswald;
    font-weight: bold;
    background-color: #C9BDAC;
    justify-content: space-between;
    position: sticky;
    top:0;
    padding: 10px 30px;
    margin: 0 auto;
`;

const StyledLogo = styled.a`
    font-size: 50px;
`;

const StyledNav = styled.nav`
    display: flex;
    align-items: center;
    gap: 25px;
    font-size: 20px;
    &:hover {
        color: grey;
      }
`;

function Header() {
    return(
        <StyledHeader>
            <StyledNav>
                <a href="/shop">SHOP</a>
            </StyledNav>
            <StyledLogo href="/">TUTELA</StyledLogo>
            <StyledNav>
                <a href="/cart">CART (0)</a>
            </StyledNav>
        </StyledHeader>
    )
}

export default Header;