import React from 'react'
import ServiceCard from './ServiceCard'

const Services = () => {
    const number = [0, 1,2,3,4,5,6,7]
  return (
    <article className="w-full space-y-4 py-4 animate-sladeInFromBottomLarge">
      <h4 className=" text-2xl font-semibold self-start">Servicios</h4>
      <div className="grid grid-cols-1 gap-6 w-full md:p-0 md:grid-cols-2">
        {number.map((n, idx) => {
            return <ServiceCard idx={idx}/>
        })}
        {/* {data.categorias.map((c) => {
          return (
            <CategoryCard
              key={c.id}
              data={{
                name: c.nombre,
                description: c.description,
                image: c.image,
              }}
            />
          );
        })} */}
      </div>
    </article>
  )
}

export default Services