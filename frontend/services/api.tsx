import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_BASE_URL,
    headers: {
        'X-API-Key': process.env.EXPO_PUBLIC_API_KEY,
        'Content-Type': 'application/json',
    }
})


export const getItems = async () => {
    try {
        const response = await apiClient.get(`/items`)
        return response.data
    } catch (error) {
        console.warn('Error fetching items:', error)
        throw error
    }
}

export const getItemById = async(id: string | string[]) => {
    try {
        const response = await apiClient.get(`/items/${id}`);
        return response.data
    } catch (error) {
        console.warn('Error fetching items:', error)
        throw error
    }
}

export const getStoresByItemAndLocation = async(id: string | string[], longitude: number, latitude: number) => {
    try {
        const response = await apiClient.get(`/stores/${id}`, {
            params: {
                longitude,
                latitude
            }
        })
        return response.data;
    } catch(err) {
        console.warn("Error fetching stores: ", err)
        throw err;
    }
}