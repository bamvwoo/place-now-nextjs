import Image from "next/image";
import styled from "styled-components";

export default function Logo() {
    return (
        <Wrapper
            as={Image}
            src="/images/logo-dark.svg"
            alt="Logo"
            width={35}
            height={35} />
    );
};

const Wrapper = styled.div`
    margin: 0 5px;

    img {
        object-fit: cover;
    }
`;