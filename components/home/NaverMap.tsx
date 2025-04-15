import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

export default function NaverMap() {
    const mapRef = useRef<naver.maps.Map | null>(null);
    const markerRef = useRef<naver.maps.Marker | null>(null);

    const [ location, setLocation ] = useState({ latitude: 0, longitude: 0 });

    useEffect(() => {
        if (!naver) return;

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude });

                // 맵 초기화
                if (!mapRef.current) {
                    mapRef.current = new naver.maps.Map("mainMap", {
                        center: new naver.maps.LatLng(position.coords.latitude, position.coords.longitude),
                        zoom: 17,
                        disableKineticPan: false
                    });
                }

                // 마커 초기화
                if (mapRef.current && !markerRef.current) {
                    markerRef.current = new naver.maps.Marker({
                        position: new naver.maps.LatLng(position.coords.latitude, position.coords.longitude),
                        map: mapRef.current
                        /*
                        icon: {
                            content: `<img src="${markerImage}" width="300" height="300" />`,
                            size: new naver.maps.Size(300, 300),
                            anchor: new naver.maps.Point(150, 150)
                        }
                        */
                    });
                }
            });

            navigator.geolocation.watchPosition((position) => {
                setLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude });

                if (mapRef.current) {
                    mapRef.current.setCenter(new naver.maps.LatLng(position.coords.latitude, position.coords.longitude));
                }

                if (markerRef.current) {
                    markerRef.current.setPosition(new naver.maps.LatLng(position.coords.latitude, position.coords.longitude));
                }
            });
        }
    }, []);

    return (
      <Wrapper id="mainMap" />
    );
}

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
`;