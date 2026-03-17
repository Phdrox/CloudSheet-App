
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

export const getApi= async ({id,url}:getAxios)=>{
  if (!url) return
       const data=await axios.get(`https://cloud-sheet.vercel.app/${url}`,{withCredentials:true,headers:{'Content-Type':'application/json','Access-Control-Allow-Origin':'*'}}).then(res=>res.data)
       return data

}

export const postApi=({url,data}:postAxios)=>{
   return axios.post(`https://cloud-sheet.vercel.app/${url}`,data,{withCredentials:true,headers:{'Content-Type':'application/json','Access-Control-Allow-Origin':'*'}})
}

export const putApi=({url,data,id}:IdAxios)=>{
   return axios.put(`https://cloud-sheet.vercel.app/${url}`,data,{withCredentials:true,headers:{'Content-Type':'application/json','Access-Control-Allow-Origin':'*'}})
}

export const deleteApi=({url}:IdAxios)=>{
   return axios.delete(`https://cloud-sheet.vercel.app/${url}`,{withCredentials:true,headers:{'Content-Type':'application/json','Access-Control-Allow-Origin':'*'}})
}