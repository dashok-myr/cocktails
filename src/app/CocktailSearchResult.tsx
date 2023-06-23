import Link from 'next/link'
import Image from 'next/image'
import nextIcon from '@/icons/next-icon.svg'
import React from 'react'
import { ICocktail } from '@/app/page'

interface ICocktailList {
  cocktails: ICocktail[] | null
}

export default function CocktailSearchResult({ cocktails }: ICocktailList) {
  if (!cocktails) {
    return (
      <div className="flex justify-center mt-48 text-light-grayish-blue h-screen">
        Oops... There is no such cocktail
      </div>
    )
  }

  return (
    <div className="overflow-y-auto h-auto md:h-96">
      {cocktails?.length > 0 && (
        <div className="flex flex-col justify-center md:w-[480px] md:mx-auto bg-dark-grayish-blue1 p-5">
          {cocktails.map((cocktail) => {
            return (
              <React.Fragment key={cocktail.idDrink}>
                <Link
                  className="flex justify-between items-center gap-4 p-2.5"
                  href={`cocktail/${cocktail.idDrink}`}
                >
                  <Image
                    className="rounded-full h-10 w-12"
                    src={cocktail.strDrinkThumb}
                    alt="cocktail"
                    width="80"
                    height="80"
                  />
                  <div className="w-full text-light-grayish-blue">
                    {cocktail.strDrink}
                  </div>
                  <Image className="w-3 h-3" src={nextIcon} alt="search" />
                </Link>
                <div className="h-0.5 w-full bg-black"></div>
              </React.Fragment>
            )
          })}
        </div>
      )}
    </div>
  )
}
