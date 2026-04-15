'use client'
import CardGoal from '@/components/CardGoal';
export default function Goals() {
  return (
    <div className='p-5 pt-7'>
        <div className="w-full flex justify-center text-2xl text-white ">
            Metas
        </div> 
      <CardGoal data={[]} />
     
    </div>
  );
}
