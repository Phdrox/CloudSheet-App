

import { api } from "./interceptor";

type getAxios={
    id?:string;
    url:string;
}
type postAxios={
    url:string;
    data?:object;
}

type IdAxios={
    id?:string;
    url:string;
    data?:object;
}

export const getApi=  ({id,url}:getAxios) => {
  if (!url) return
       const data=  api.get(url.startsWith("/") ? url : `/${url}`,
        {withCredentials:true,
        headers:{'Content-Type':'application/json'}}).then(res=>res.data)
       return data

}

export const postApi= ({url,data}:postAxios)=>{
   return  api.post(url.startsWith("/") ? url : `/${url}`,
    data,{withCredentials:true,
        headers:{'Content-Type':'application/json'}})
}

export const putApi= ({url,data}:IdAxios)=>{
   return  api.put(url.startsWith("/") ? url : `/${url}`,
    data,{withCredentials:true,
        headers:{'Content-Type':'application/json'}})
}

export const  deleteApi=  ({url}:postAxios)=>{
   return  api.delete(url.startsWith("/") ? url : `/${url}`,
    {withCredentials:true,
    headers:{'Content-Type':'application/json'}})
}