import { IPlace } from '@/models/Place';
import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

export type Location = { lat: number; lng: number };

type Subscribers = {
    onChange?: (location: Location, nearbyPlaces: IPlace[]) => void | Promise<void>;
};

const LocationContext = createContext<{
    location: Location;
    nearbyPlaces: IPlace[];
    updateLocation: (newLoc: Partial<Location>) => void;
    subscribe: (handlers: Subscribers) => () => void;
} | null>(null);

export const LocationProvider = ({ children }: { children: React.ReactNode }) => {
    const [location, setLocation] = useState<Location>({ lat: 0, lng: 0 });
    const [nearbyPlaces, setNearbyPlaces] = useState<IPlace[]>([]);

    const subscribers = useRef({
        onChange: new Set<(location: Location, nearbyPlaces: IPlace[]) => void | Promise<void>>()
    });

    const fetchNearbyPlaces = async (location: Location) => {
        const response = await fetch(`/api/places/nearby?lat=${location.lat}&lng=${location.lng}`);
        const data = await response.json();

        setNearbyPlaces(data);

        return data;
    };

    const updateLocation = useCallback(async (newLocation: Partial<Location>) => {
        const next: Location = { ...location, ...newLocation };

        if (location.lat === next.lat && location.lng === next.lng) return;

        setLocation(next);

        const result = await fetchNearbyPlaces(next);

        (async () => {
            for (const subscriber of subscribers.current.onChange) {
                try {
                    await subscriber(next, result);
                } catch (err) {
                    console.error('onChange handler error:', err);
                }
            }
        })();
    }, []);

    const subscribe = useCallback((handlers: Subscribers) => {
        if (handlers.onChange) {
            subscribers.current.onChange.add(handlers.onChange);
        }
        return () => {
            if (handlers.onChange) {
                subscribers.current.onChange.delete(handlers.onChange);
            }
        };
    }, []);

    return (
        <LocationContext.Provider value={{ location, updateLocation, nearbyPlaces, subscribe }}>
            {children}
        </LocationContext.Provider>
    );
};

export const useLocation = () => {
    const ctx = useContext(LocationContext);
    if (!ctx) throw new Error('useLocation must be used within LocationProvider');

    useEffect(() => {
    }, []);

    return ctx;
};