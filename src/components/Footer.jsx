import React from "react";
import styled from 'styled-components';

const StyledFooter = styled.div`
    padding: 20px;
    text-align: center;
    justify-content: center;
`;

function Footer() {
    return (
        <StyledFooter>
            <p className="text-sm mt-2 text-grey-900">
                &copy; {new Date().getFullYear()} Tutela. All Rights Reserved.
            </p>
            <p className="text-sm mt-2 text-grey-900">
                Website Designed By Connor Maclachlan.
            </p>
        </StyledFooter>
    )
}

export default Footer;