"use client"
import AppSidebar from "@/components/sidebar"
import { SidebarProvider,SidebarTrigger } from "@/components/ui/sidebar"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const {data: session, isPending } = authClient.useSession()
  const router = useRouter()
  
  console.log(session)
  if(session){
    router.push('/main/dashboard')
  }
  
  


  const menuItems = [
    { name: "Dashboard", icon: "dashboard", url: "/main/dashboard", allowed: ["admin", "all"] },
    { name: "Histórico", icon: "history", url: "/main/history", allowed: ["admin", "all"] },
    { name: "Metas", icon: "goals", url: "/main/goals", allowed: ["admin", "all"] },
    { name: "Users", icon: "user", url: "/main/users", allowed: ["admin"] }
  ]

 

  return (
    <div className="flex bg-accent-foreground">
        <SidebarProvider className="px-3">
            <AppSidebar array={menuItems} user="Bento" />
            <SidebarTrigger className="bg-sky-700 text-white cursor-pointer"/>
            <div className="">
              {children}
            </div>
        </SidebarProvider>
    </div>
  )
}