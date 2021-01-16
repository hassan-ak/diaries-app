// import
// Axios imports
import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
// Show alert imports
import { showAlert } from '../util';

// axios instanse with base url
const http: AxiosInstance = axios.create({
    baseURL: 'https://diaries.app',
});

// post request
http.defaults.headers.post['Content-Type'] = 'application/json';

// use response from the api call
http.interceptors.response.use(
    // in case api call return valid data
    async (response: AxiosResponse): Promise<any> => {
        if (response.status >= 200 && response.status < 300) {
        return response.data;
        }
    },
    // in case api call return an error
    (error: AxiosError) => {
        const {
            response,
            request,
        }: { response?: AxiosResponse; request?: XMLHttpRequest } = error;
        // handle response error
        if (response) {
            if (response.status >= 400 && response.status < 500) {
                showAlert(response.data?.data?.message, 'error');
                return null;
            }
        // Handle request error
        } else if (request) {
            showAlert('Request failed. Please try again.', 'error');
            return null;
        }
        return Promise.reject(error);
    }
);

export default http;