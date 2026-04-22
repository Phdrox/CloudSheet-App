import { useAddValue, useDeleteGoal } from "@/hooks/forms-actions";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Loader, PlusIcon, Trash } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Input } from "./ui/input";
import { Controller } from "react-hook-form";
import { Label } from "./ui/label";
interface CardGoalProps {
  children?: React.ReactNode;
  name:string;
  id:string;
  data:{
    have:string;
    value:string;
    id_account:string;
    name: string;
  }
}


export default function CardGoal({ children,name,id,data }: CardGoalProps) {

  const {onSubmit,isDeleting} = useDeleteGoal(id);
  const {onSubmitEdit,handleSubmit,control} = useAddValue(id,data)
  
  return(
    <Card className="w-2/7 dark shadow-lg flex flex-col justify-center items-center  ">
      <CardHeader className="w-full flex justify-between items-center">
        <CardTitle className="text-lg text-white">{name}</CardTitle>
        <div className="flex gap-2">
          <Popover >
            <PopoverTrigger className="cursor-pointer bg-teal-600 w-1/1 shadow rounded-md flex justify-center items-center"><PlusIcon /></PopoverTrigger>
            <PopoverContent side="right" className="w-3/4">
              <form onSubmit={handleSubmit(onSubmitEdit)} className="flex flex-col gap-3">
              <input type="hidden" {...control.register("name")} />
              <Controller name="have" control={control} render={({field})=>(
                <div>
                  <Label>Tenho</Label>
                  <Input {...field} type="text" />
                </div>
              )} />
              
              <Controller name="value" control={control} render={({field})=>(
                <div>
                  <Label>Preciso</Label>
                  <Input {...field} type="text" />
                </div>
              )} />
              
              <Button type="submit" className=" w-full cursor-pointer bg-green-500">Enviar</Button>
              </form>
            </PopoverContent>
          </Popover>
           <Button onClick={() => onSubmit(id)} className=" w-1/2 cursor-pointer" variant="destructive">
            {isDeleting && id? <Loader className="animate-spin"/> : <Trash size={16} />}
          </Button>
        </div>
      </CardHeader>
      <CardContent >
        {children}
      </CardContent>
     </Card>
  );  
  
}