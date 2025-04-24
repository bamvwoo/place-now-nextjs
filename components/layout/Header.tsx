import { useState } from "react";
import styled from "styled-components";
import Logo from "../common/Logo";

export default function Header() {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    return (
        <Wrapper>
            <CenterContainer $isFocused={isFocused}>
                <Logo />
                <input type="text" onFocus={handleFocus} onBlur={handleBlur}></input>
            </CenterContainer>
            <RightContainer>

            </RightContainer>
        </Wrapper>
    );
};

const Wrapper = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 30%;
    height: 5rem;

    z-index: 1000;
    position: fixed;
    top: 5%;
    left: 50%;
    transform: translate(-50%, -5%);

    padding: 1rem;

    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 4rem;
`;

const CenterContainer = styled.div<{ $isFocused: boolean }>`

`;

const RightContainer = styled.div`
`;