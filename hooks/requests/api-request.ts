
import axios from "axios"

type getAxios={
    id?:string;
    url:string;
}
type postAxios={
    url:string;
    data:object;
}

type IdAxios={
    id:string;
    url:string;
    data?:object;
}

export const getApi= async ({id,url}:getAxios) => {
  if (!url) return
       const data=await axios.get(url.startsWith("/") ? url : `/${url}}`,
        {withCredentials:true,
        headers:{'Content-Type':'application/json'}}).then(res=>res.data)
       return data

}

export const postApi=({url,data}:postAxios)=>{
   return axios.post(`${url}`,
    data,{withCredentials:true,
        headers:{'Content-Type':'application/json'}})
}

export const putApi=({url,data,id}:IdAxios)=>{
   return axios.put(`${url}`,
    data,{withCredentials:true,
        headers:{'Content-Type':'application/json'}})
}

export const deleteApi=({url}:IdAxios)=>{
   return axios.delete(`${url}`,
    {withCredentials:true,
    headers:{'Content-Type':'application/json'}})
}