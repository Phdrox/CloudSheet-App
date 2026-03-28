import React from 'react'
import { Card, CardContent, CardFooter, CardTitle } from './ui/card'


type ICardPrice={
    title:string,
    price:number,
    color?:string,
    bgTitle?:string,
}

export default function CardPrice({price,title,color,bgTitle}:ICardPrice) {
  
  const format= (i:number) => new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(i)

  return (
    <Card className={`text-white font-raleway shadow-2xl shadow-primary border border-border ${bgTitle? bgTitle:'bg-border'} w-1/4 `}>
        <CardTitle className=' w-full px-2 text-xl'>{title} 
          {title==='Saldo'?<span className='text-sm'> Total</span>:<span className='text-sm'> Totais</span>}
          </CardTitle>
        <CardFooter className={`bg-accent-foreground ${color ? color:'text-ring'} text-2xl font-semibold `}>{format(price)}</CardFooter>
    </Card>
  )
}
