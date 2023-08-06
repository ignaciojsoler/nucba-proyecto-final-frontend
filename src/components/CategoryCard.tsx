import React from 'react'

interface CategoryCardProps {
  data: {
    name: string;
    description: string;
    image?: string;
  }
}

const CategoryCard = (props: CategoryCardProps) => {
  const {data} = props;
  return (
    <div className='rounded-lg bg-slate-800 bg-opacity-40 backdrop-blur-lg overflow-hidden h-24 p-3 flex w-full md:h-26 lg:h-32'>
      <div className='absolute -z-10 w-full h-full top-0 left-0 transition hover:scale-105'>
        <div className='h-full w-full bg-slate-900 absolute top-0 left-0 opacity-70'></div>
        <img src={data.image} alt="category image" className='object-cover h-full w-full'/>
      </div>
      <h5 className='font-bold '>{data.name}</h5>
    </div>
  )
}

export default CategoryCard