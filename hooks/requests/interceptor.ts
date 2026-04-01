import { rejects } from "assert";
import axios from "axios";
import Router from "next/router";
import { resolve } from "path";

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((prom: any) => {
        if (error) prom.reject(error);
        else prom.resolve(token);
    });
    failedQueue = [];
};

export const api = axios.create({
    baseURL: '/api',
    withCredentials: true,
    timeout: 5000,
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
       const originalRequest=error.config;

       if(
          originalRequest.url?.includes('/auth/login')||
          originalRequest.url?.includes('/auth/refresh')||
          originalRequest.url?.includes('/auth/logout')
       ){
         return Promise.reject(error)
       }

       if(error.response?.status === 401 && !originalRequest._retry){
        if(isRefreshing){
            return new Promise((resolve,reject) => {
               failedQueue.push({resolve,reject});
            }).then( ()=> api(originalRequest));
        }

        originalRequest._retry= true;
        isRefreshing=true;
        
        return new Promise((resolve,rejects) => {
            axios.post('/api/auth/refresh',{},{withCredentials:true})
            .then(() => {
                processQueue(null)
                resolve(api(originalRequest));
            })
            .catch((err) => {
                processQueue(err);
                
                if(typeof window !== "undefined"){
                    Router.push("/auth/login");
                }
                rejects(err);
            })
            .finally(()=>{
                isRefreshing=false;
            });
        });
       }
       return Promise.reject(error)
    }
);