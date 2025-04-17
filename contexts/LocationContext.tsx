import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

export type Location = { lat: number; lng: number };

type Subscribers = {
    onChange?: (location: Location) => void | Promise<void>;
};

const LocationContext = createContext<{
    location: Location;
    updateLocation: (newLoc: Partial<Location>) => void;
    subscribe: (handlers: Subscribers) => () => void;
} | null>(null);

export const LocationProvider = ({ children }: { children: React.ReactNode }) => {
    const [location, setLocation] = useState<Location>({ lat: 0, lng: 0 });

    const subscribers = useRef({
        onChange: new Set<(location: Location) => void | Promise<void>>()
    });

    const updateLocation = useCallback((newLoc: Partial<Location>) => {
        setLocation((prev) => {
            const next = { ...prev, ...newLoc };

            if (prev.lat === next.lat && prev.lng === next.lng) return prev;

            (async () => {
                for (const subscriber of subscribers.current.onChange) {
                    try {
                        await subscriber(next);
                    } catch (err) {
                        console.error('onChange handler error:', err);
                    }
                }
            })();

            return next;
        });
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
        <LocationContext.Provider value={{ location, updateLocation, subscribe }}>
            {children}
        </LocationContext.Provider>
    );
};

export const useLocation = () => {
    const ctx = useContext(LocationContext);
    if (!ctx) throw new Error('useLocation must be used within LocationProvider');

    const { location, updateLocation, subscribe } = ctx;

    useEffect(() => {
    }, []);

    return { location, updateLocation, subscribe };
};