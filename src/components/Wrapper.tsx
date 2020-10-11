import React, {ReactNode} from 'react';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive'

interface FComponentProps {
    children:ReactNode;
}

const StyledDiv = styled.div`
  display: flex;
`;

const DESKTOP_MODE_MIN_WIDTH = 992;

const TABLET_MODE_MAX_WIDTH = 991;
const TABLET_MODE_MIN_WIDTH = 768;

const MOBILE_MODE_MAX_WIDTH = 767;

const FComponent:React.FC<FComponentProps> = ({children}) => {

    const Desktop:React.FC<FComponentProps | null> = ({children}) => {
        const isDesktop = useMediaQuery({ minWidth: DESKTOP_MODE_MIN_WIDTH })
        console.log(isDesktop)
        return isDesktop ? children : null
    }
    const Tablet = ({ children }) => {
        const isTablet = useMediaQuery({ minWidth: TABLET_MODE_MIN_WIDTH, maxWidth: TABLET_MODE_MAX_WIDTH })
        console.log(isTablet)
        return isTablet ? children : null
    }
    const Mobile = ({ children }) => {
        const isMobile = useMediaQuery({ maxWidth: MOBILE_MODE_MAX_WIDTH })
        console.log(isMobile)
        return isMobile ? children : null
    }

    return (
    <StyledDiv>
        <Desktop>{children}</Desktop>
        <Tablet>{children}</Tablet>
        <Mobile>{children}</Mobile>
    </StyledDiv>
    )};

export default FComponent;