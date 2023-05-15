import Link from 'next/link'
import Image from 'next/image'
import nextIcon from '@/icons/next-icon.svg'
import React from 'react'
import { ICocktail } from '@/app/page'

interface ICocktailList {
  cocktails: ICocktail[] | null
}

export default function CocktailList({ cocktails }: ICocktailList) {
  if (!cocktails) {
    return (
      <div className="flex justify-center items-center">
        Oops... There is no such cocktail
      </div>
    )
  }

  return (
    <div>
      {cocktails.map((cocktail) => {
        return (
          <Link
            key={cocktail.idDrink}
            className="flex justify-between items-center gap-4 p-2.5 border-t-2 last:border-b-2"
            href={`cocktail/${cocktail.idDrink}`}
          >
            <Image
              className="rounded-full h-10 w-12"
              src={cocktail.strDrinkThumb}
              alt="cocktail"
              width="80"
              height="80"
            />
            <div className="w-full">{cocktail.strDrink}</div>
            <Image className="w-3 h-3" src={nextIcon} alt="search" />
          </Link>
        )
      })}
    </div>
  )
}
