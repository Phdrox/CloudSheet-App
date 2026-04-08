'use client'
import { Sidebar, SidebarGroupLabel, SidebarMenuButton } from "./ui/sidebar"
import {SidebarFooter, SidebarHeader,SidebarContent} from "./ui/sidebar"
import {FaTachometerAlt,FaList,FaMapPin,FaUser}from "react-icons/fa"
import { IconType } from "react-icons"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { DoorClosedIcon } from "lucide-react"
import { Button } from "@base-ui/react"
import { useGetQueries } from "@/hooks/methodsApi"
import { useLogout } from "@/hooks/dashboard-action"


type IDash={
  name:string,
  icon:string,
  url:string,
}
type IPropDash={
  array:IDash[],
  user:string
}

const icons: Record<string, IconType> = {
  dashboard: FaTachometerAlt,
  history: FaList,
  goals: FaMapPin,
  user: FaUser
}

export  function AppSidebar({user,array}:IPropDash) {

  const {onSubmit}=useLogout()
  
  const pathname=usePathname()
 // Verifique os dados da sessão no console
  return (
     <Sidebar className="bg-sidebar text-sidebar-primary-foreground border-r border-sidebar-border dark" >
      <SidebarHeader/>
        <span className="flex items-center justify-center text-primary">
          {user}
        </span>
      <SidebarHeader />
      <SidebarGroupLabel>Menu</SidebarGroupLabel>
      <SidebarContent className="flex flex-col gap-2">
          {array?.map((item) => {
          const Icon=icons[item.icon]
          const isActive=pathname===item.url
          return (
            <SidebarMenuButton 
            asChild 
            isActive={isActive}
            className="font-raleway"
            key={item.name}
          >
            <Link
              key={item.name}
              href={item.url}
              className={`flex items-center gap-2 p-2  font-raleway ${isActive ? "bg-sidebar-accent text-ring font-semibold" : ""} `}
            >
              <Icon size={18} className=""/>
              {item.name}
            </Link>
            </SidebarMenuButton>
          )
        })}
      </SidebarContent>
      <SidebarFooter className="p-20"><Button className='flex gap-2 cursor-pointer' onClick={()=>onSubmit()}> <DoorClosedIcon/> Logout </Button></SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar