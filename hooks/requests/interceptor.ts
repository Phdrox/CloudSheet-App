import axios from "axios";


export const api=axios.create({
    baseURL:process.env.NEXT_PUBLIC_API_URL,
    withCredentials:true,
    headers: {
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    'Expires': '0',
  }
});

const apiRefresh = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true
});

api.interceptors.response.use(
    (response) => response,
    async (error) =>{
        let isRefreshing = false;
        let failedQueue:any = [];
        const originalRequest = error.config;

        const processQueue = (error:any, token = null) => {
        failedQueue.forEach((prom:any) => {
            if (error) prom.reject(error);
            else prom.resolve(token);
        });
            failedQueue = [];
        };

// Dentro do seu interceptor:
        if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                failedQueue.push({ resolve, reject });
            })
            .then(token => {
                originalRequest.headers['Authorization'] = 'Bearer ' + token;
                return api(originalRequest);
            }).catch(err => Promise.reject(err));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        return new Promise((resolve, reject) => {
          apiRefresh.post('/auth/refresh')
            .then(({ data }) => {
              const token = data.access_token;
              api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
              processQueue(null, token);
              resolve(api(originalRequest));
            })
            .catch((err) => {
              processQueue(err, null);
              window.location.href = '/auth/login';
              reject(err);
            })
            .finally(() => { isRefreshing = false; });
        });
        }
    }
)