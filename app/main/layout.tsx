"use client"
import AppSidebar from "@/components/sidebar"
import { SidebarProvider,SidebarTrigger } from "@/components/ui/sidebar"
import { useGetQueries } from "@/hooks/methodsApi"
import { getApi } from "@/hooks/requests/api-request"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  
  const menuItems = [
    { name: "Dashboard", icon: "dashboard", url: "/main/dashboard", allowed: ["admin", "all"] },
    { name: "Histórico", icon: "history", url: "/main/history", allowed: ["admin", "all"] },
    { name: "Metas", icon: "goals", url: "/main/goals", allowed: ["admin", "all"] },
    { name: "Users", icon: "user", url: "/main/users", allowed: ["admin"] }
  ]
  
  const {data,isLoading,isError}= useGetQueries({
    key:['profile'],
    queryFn:() => getApi({url:'/auth/profile'}),
  });
  
  useEffect(() => {
    if (!isLoading && (!data|| isError)) {
      router.push('/auth/login');
    }
  }, [ isLoading,data, isError, router]);
  
 if (isLoading) {
  return (
    <div className="flex h-screen items-center justify-center bg-accent-foreground text-white">
      Carregando...
    </div>
  );
}

if (!data) return null;
  
return (
    <div className="flex bg-accent-foreground">
        <SidebarProvider className="px-3">
            <AppSidebar user={data.name} array={menuItems}/>
            <SidebarTrigger className="bg-sky-700 text-white cursor-pointer"/>
            <div className="w-full">
              {children}
            </div>
        </SidebarProvider>
    </div>
  )
}