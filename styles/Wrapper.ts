import styled from "styled-components";

const WrapperBase = styled.div`
    display: flex;
`;

const VerticalWrapper = styled(WrapperBase)`
    flex-direction: column;
`;

const HorizontalWrapper = styled(WrapperBase)`
    flex-direction: row;
`;

export { VerticalWrapper, HorizontalWrapper };