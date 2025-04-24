import lottie from 'lottie-web';
import animationData from '@/public/images/marker.json';
import styled from 'styled-components';
import { useEffect, useRef } from 'react';

export default function LocationMarker() {

    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (wrapperRef.current) {
            lottie.loadAnimation({
                container: wrapperRef.current,
                animationData,
                renderer: 'svg',
                loop: true,
                autoplay: true,
            });
        }
    }, []);

    return (
        <Wrapper ref={wrapperRef} />
    );
}

const Wrapper = styled.div`
    width: 200px;
    height: 200px;
`;