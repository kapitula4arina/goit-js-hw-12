import axios from 'axios';
export let perPage = 15;

const KEY_API = '47396202-c5f2839f415e9ee9a67459191';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export async function getImages(qValue, page) {
    if (!qValue || qValue.trim() === '') {
        throw new Error('Search query cannot be empty.');
    }

    try {
        const response = await axios.get('', {
            params: {
                key: KEY_API,
                q: qValue,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,
                page,
                per_page: perPage,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching images:', error);
        throw error;
    }
}
