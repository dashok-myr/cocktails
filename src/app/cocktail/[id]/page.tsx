import React from 'react'
import Image from 'next/image'
import ICocktailDetails from '@/app/cocktail/[id]/ICocktailDetails'
import getAllIngredientsInfo from '@/app/cocktail/[id]/getAllIngredientsInfo'
import CocktailPieChart from '@/app/cocktail/[id]/CocktailPieChart'
import leftArrow from '../../../icons/prev-icon.png'
import Link from 'next/link'

async function fetchCocktailDetails(id: string): Promise<ICocktailDetails> {
  const res = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
  )
  const data = await res.json()
  return data.drinks[0]
}

export default async function CocktailDetails({
  params,
}: {
  params: { id: string }
}) {
  const cocktailDetails = await fetchCocktailDetails(params.id)

  const ingredients = getAllIngredientsInfo(cocktailDetails)

  return (
    <>
      <div className="grid grid-cols-3 bg-gray-100 border-b-2 p-3">
        <div className="flex items-center">
          <Image src={leftArrow} alt="arrowLeft" width={25} height={25} />
          <Link href="/" className="justify-self-start text-blue-600">
            Thirsty
          </Link>
        </div>
        <div className="text-center font-semibold ">
          {cocktailDetails.strDrink}
        </div>
      </div>

      <div className="flex flex-col items-center py-8 px-5">
        <Image
          className="rounded-full"
          src={cocktailDetails.strDrinkThumb}
          alt="cocktail"
          width="130"
          height="130"
        />
        <div className="font-bold text-xl pt-4">{cocktailDetails.strDrink}</div>
        <div className="self-start font-bold pt-8">Ingredients:</div>
        <div className="flex justify-between w-full">
          <div className="flex flex-col">
            {ingredients.map(({ ingredient, measure, backgroundColor }) => {
              return (
                <div key={ingredient} className="flex items-center">
                  <div
                    className="h-3 w-3"
                    style={{ backgroundColor: backgroundColor }}
                  ></div>
                  <div className="ml-1">
                    {ingredient} {!!measure && `(${measure})`}
                  </div>
                </div>
              )
            })}
          </div>
          <CocktailPieChart ingredients={ingredients} />
        </div>
        <div className="mt-7">{cocktailDetails.strInstructions}</div>
      </div>
    </>
  )
}
