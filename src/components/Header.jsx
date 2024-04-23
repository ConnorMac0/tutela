import React from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';

const StyledHeader = styled.header`
    display: flex;
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
                <Link to='/shop/'>SHOP</Link>
            </StyledNav>
            <StyledLogo href="/tutela/">TUTELA</StyledLogo>
            <StyledNav>
                <Link to="/cart/">CART (0)</Link>
            </StyledNav>
        </StyledHeader>
    )
}

export default Header;