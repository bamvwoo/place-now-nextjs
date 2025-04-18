import { IPlace } from "@/models/Place";
import { VerticalWrapper } from "@/styles/Wrapper";
import styled from "styled-components";

export default function PlaceMarker({ place }: { place: IPlace }) {
    return (
        <Wrapper>
            <h3>{place.name}</h3>
        </Wrapper>
    );
}

const Wrapper = styled(VerticalWrapper)`
    transform: translate(-50%, -100%);
    max-width: 280px;

    background-color: #ffffff;
    padding: 1rem 1.2rem;
    border-radius: 12px;
    border: 1px solid #d0d0d0;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

    font-size: 0.95rem;
    line-height: 1.4;
    color: #333;
    text-align: center;

    &::after {
        content: "";
        position: absolute;
        bottom: -5px;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-top: 10px solid #fff;
    }
`;
