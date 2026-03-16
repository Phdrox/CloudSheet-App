"use client"
import AppSidebar from "@/components/sidebar"
import { SidebarProvider,SidebarTrigger } from "@/components/ui/sidebar"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
const router = useRouter()
  const { data: session, isPending } = authClient.useSession()

  const menuItems = [
    { name: "Dashboard", icon: "dashboard", url: "/main/dashboard", allowed: ["admin", "all"] },
    { name: "Histórico", icon: "history", url: "/main/history", allowed: ["admin", "all"] },
    { name: "Metas", icon: "goals", url: "/main/goals", allowed: ["admin", "all"] },
    { name: "Users", icon: "user", url: "/main/users", allowed: ["admin"] }
  ]

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/auth/login")
    }
  }, [session, isPending, router])

  // Evita renderizar o conteúdo enquanto verifica a sessão
  if (isPending) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-accent-foreground text-white">
        <p className="animate-pulse font-raleway">Carregando...</p>
      </div>
    )
  }

  if (!session) return null

  console.log(session)
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