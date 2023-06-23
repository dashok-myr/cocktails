import Image from 'next/image'
import leftArrow from '@/icons/prev-icon.png'
import Link from 'next/link'
import React from 'react'

interface CocktailBackgroundProps {
  label: string
}

export default function CocktailBackground({ label }: CocktailBackgroundProps) {
  return (
    <div className="absolute h-72 w-screen">
      <div className="inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-70 h-72 absolute" />
      <div className="bg-cocktail-background bg-cover bg-center bg-no-repeat h-full">
        <div className="flex flex-col md:grid md:grid-cols-3 h-full">
          <div className="z-10">
            <div className="flex items-center pt-5">
              <div>
                <Image src={leftArrow} alt="arrowLeft" width={25} height={25} />
              </div>
              <div>
                <Link href="/" className="justify-self-start text-bright-blue">
                  Thirsty
                </Link>
              </div>
            </div>
          </div>
          <div className="flex ml-5 mt-24 md:ml-0 md:mt-0 md:self-center z-10">
            <p className="text-center text-bright-blue font-bold text-5xl tracking-widest">
              {label}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
