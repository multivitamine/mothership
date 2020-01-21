import styled from 'styled-components';

export const StyledHeaderContainer = styled.div`
  width: 80%; 
  margin:0px auto;
`;
export const StyledLogoContainer = styled.div`
    height: inherit;
    display: flex;
    img {
        height: 60px; 
        width: 196px; 
        align-self: center;
    }
`;
export const StyledNavContainer = styled.nav`
    width: 30%;
    float: left;
`;
export const StyledBody = styled.div`
    width: 70%; 
    float: left;
`;
export const StyledLi = styled.li`
    color: black;
    text-decoration: none;

    a {
        color: black;
        text-decoration: none;
    }
    a:hover {
        text-decoration: underline;
    }
`;
export const StyledLink = styled.p`
    color: black;
    text-decoration: none;    
    cursor: pointer;
    :hover {
        text-decoration: underline;
    }
    a {
        color: black;
        text-decoration: none;
    }
    a:hover {
        text-decoration: underline;
    }
`;
export const StyledUl = styled.ul`
    list-style: none;
`;
