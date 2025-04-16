import { VerticalWrapper } from "@/styles/Wrapper";
import styled from "styled-components";

export default function Page({ children }: { children: React.ReactNode }) {
    return (
      <Wrapper>
        {children}
      </Wrapper>
    );
};

const Wrapper = styled(VerticalWrapper)`
  width: 100%;
  height: 100%;
`;