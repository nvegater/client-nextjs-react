import React, {ReactNode} from 'react';
import styled, {keyframes} from 'styled-components';
import {useMediaQuery} from 'react-responsive'

interface FComponentProps {
    children: ReactNode;
}

const DESKTOP_MODE_MIN_WIDTH = 992;
const TABLET_MODE_MAX_WIDTH = 991;
const TABLET_MODE_MIN_WIDTH = 768;
const MOBILE_MODE_MAX_WIDTH = 767;

const ResponsiveContainer: React.FC<FComponentProps> = ({children}) => {
    const isDesktop = useMediaQuery({minWidth: DESKTOP_MODE_MIN_WIDTH})
    const isTablet = useMediaQuery({minWidth: TABLET_MODE_MIN_WIDTH, maxWidth: TABLET_MODE_MAX_WIDTH})
    const isMobile = useMediaQuery({maxWidth: MOBILE_MODE_MAX_WIDTH})
    return (
        <StyledDiv>
            {
                isDesktop &&
                <Desktop>{children}</Desktop>
            }
            {
                isTablet &&
                <Tablet>{children}</Tablet>
            }
            {
                isMobile &&
                <Mobile>{children}</Mobile>
            }
        </StyledDiv>
    )
};

export default ResponsiveContainer;

const StyledDiv = styled.div`
  display: flex;
  max-height: 50vw;
`;
const resizeToMobile = keyframes`
 0% { width: 70vh; }
 30% { width: 80vh;}
 40% { width: 90vh;  }
 100% { width: 100vw; }
`;
const Mobile = styled.div`
  text-align: center;
  max-width: 90vw;
  margin: 25vh 5vw 25vh 5vw;
  animation-name: ${resizeToMobile};
  animation-duration: 1s;
  animation-iteration-count: initial;
`;
const Tablet = styled.div`
  text-align: center;
  max-width: 70vw;
  margin: 25vh 15vw 25vh 15vw;
`;
const Desktop = styled.div`
  text-align: center;
  justify-content: center;  
  max-width: 20vw;
  margin: 25vh 40vw 25vh 40vw;
`;


