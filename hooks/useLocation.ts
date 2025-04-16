import { useState } from 'react';

export type Location = {
    latitude: number;
    longitude: number;
};

type Callback = (location: Location) => Promise<void> | void;

const useLocation = () => {
    const [location, setLocation] = useState<Location>({ latitude: 0, longitude: 0 });

    const updateLocation = (newLocation: Location, callback?: Callback) => {
        setLocation(newLocation);
        if (callback) {
            callback(newLocation);
        }
    };

    return { location, updateLocation };
};

export default useLocation;