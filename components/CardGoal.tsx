import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ChartContainer } from "./ui/chart";
import { Pie, PieChart,ResponsiveContainer } from "recharts"
import { Empty, EmptyDescription, EmptyHeader } from "./ui/empty";
import { Children } from "react";

interface CardGoalProps {
  children?: React.ReactNode;
  name:string;
}


export default function CardGoal({ children,name }: CardGoalProps) {
   
  return(
    <Card className="w-2/7 dark shadow-lg flex flex-col justify-center items-center  ">
      <CardHeader className="w-full">
        <CardTitle className="text-lg text-white">{name}</CardTitle>
        
      </CardHeader>
      <CardContent >
        {children}
      </CardContent>
     </Card>
    
  );  
  
}