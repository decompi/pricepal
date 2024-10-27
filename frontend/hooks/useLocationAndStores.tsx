import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { getStoresByItemAndLocation } from '@/services/api';

interface Store {
    name: string;
    distance: number;
    price: number;
    location: {
        latitude: number;
        longitude: number;
    };
    storeId: string;
    address: string;
}

export const useLocationAndStores = (itemId: string) => {
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [stores, setStores] = useState<Store[] | null>(null);
    const [permissionStatus, setPermissionStatus] = useState<Location.PermissionStatus | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        const fetchLocationAndStores = async () => {
            try {
                const { status } = await Location.requestForegroundPermissionsAsync();
                if (!isMounted) return;
                setPermissionStatus(status);

                if (status !== 'granted') {
                    setErrorMsg('Permission to access location was denied');
                    return;
                }

                const currentLocation = await Location.getCurrentPositionAsync({
                    accuracy: Location.Accuracy.High,
                });
                if (!isMounted) return;
                setLocation(currentLocation);

                const { latitude, longitude } = currentLocation.coords;
                //const fetchedStores = await getStoresByItemAndLocation(itemId, longitude, latitude);
                if (!isMounted) return;

                const fetchedStores = [
                    {
                        name: "Walmart",
                        distance: 5.2,
                        price: 12.99,
                        location: { latitude: 37.7749, longitude: -122.4194 },
                        storeId: "walmart-123",
                        address: "123 Main St, San Francisco, CA"
                    }
                ];

                setStores(fetchedStores.length ? fetchedStores : []);
            } catch (error) {
                if (!isMounted) return;
                console.warn('Failed to get location or stores:', error);
                setErrorMsg('Failed to fetch location or stores. Please try again.');
            }
        };

        fetchLocationAndStores();

        return () => {
            isMounted = false;
        };
    }, [itemId]);

    return { location, stores, permissionStatus, errorMsg };
};