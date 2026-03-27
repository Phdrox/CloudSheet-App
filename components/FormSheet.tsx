import { Button } from "./ui/button";
import { Sheet,SheetClose,SheetContent,SheetDescription,SheetFooter,SheetTitle,SheetHeader,SheetTrigger } from "./ui/sheet"
import React from "react"

type IFormeSheet={
    title:string;
    description:string;
    children:React.ReactNode;
    buttonSheetName:string
}

export default function FormSheet({title,description,children,buttonSheetName}:IFormeSheet) {
  
  return (
    <Sheet>
      <SheetTrigger asChild className="cursor-pointer">
        <Button variant="outline" className="text-white">{buttonSheetName}</Button>
      </SheetTrigger>
      <SheetContent side="right" className="dark text-white">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
         <div className="flex-1 py-4 px-4">
          {children}
        </div>
      </SheetContent>
    </Sheet>
  )
}
