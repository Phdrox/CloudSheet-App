'use client'
import { motion } from 'motion/react'; // Ajustado de 'motion/react' para o padrão, verifique sua versão
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import AutoScroll from 'embla-carousel-auto-scroll' 
import { useEffect } from 'react';
import Image from 'next/image';

const technologies = [
  { name: 'Next.js', description: 'Framework React para produção', icon: 'nextjs.svg', color: 'from-gray-900 to-gray-700' },
  { name: 'Tailwind CSS', description: 'Design moderno e responsivo', icon: 'tailwind.svg', color: 'from-cyan-500 to-blue-500' },
  { name: 'Nest.js', description: 'Backend escalável e robusto', icon: 'nestjs.svg', color: 'from-red-600 to-pink-600' },
  { name: 'PostgreSQL', description: 'Banco de dados confiável', icon: 'postgresql.svg', color: 'from-blue-700 to-blue-500' },
  { name: 'TypeScript', description: 'Código seguro e tipado', icon: 'typescript.svg', color: 'from-blue-600 to-blue-400' },
];

export function Technologies() {
  // O carrossel precisa de opções básicas ou apenas a ref
const [emblaRef] = useEmblaCarousel(
    { 
      loop: true, 
      dragFree: true,
      align: 'start' 
    },
    [
      AutoScroll({ 
        speed: 1,
        stopOnInteraction: false, 
        stopOnMouseEnter: false 
      })
    ]
  )


  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 overflow-hidden">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            Tecnologias de{' '}
            <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
              Ponta
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Desenvolvido com as melhores ferramentas para garantir performance e escalabilidade
          </p>
        </motion.div>

        {/* ESTRUTURA DO CARROSSEL */}
        <div className="embla overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex"> 
            {technologies.map((tech) => (
              <div key={tech.name} className="embla__slide  flex flex-col min-w-0 md:flex-[0_0_30.33%] px-2 justify-center items-center">
                  <Image width={70} height={70} src={tech.icon}  alt='icons' className='text-center'/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}