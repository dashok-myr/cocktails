import React from 'react'
import Image from 'next/image'
import ICocktailDetails from '@/app/cocktail/[id]/ICocktailDetails'
import getAllIngredientsInfo from '@/app/cocktail/[id]/getAllIngredientsInfo'
import CocktailPieChart from '@/app/cocktail/[id]/CocktailPieChart'
import CocktailBackground from '@/app/cocktail/[id]/CocktailBackground'

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
    <div className="bg-desaturated-blue h-max relative flex flex-col md:pb-52">
      <CocktailBackground label={cocktailDetails.strDrink.toUpperCase()} />
      <div className="flex flex-col mt-48 items-center py-8 px-5 lg:w-[480px] md:mx-auto bg-dark-grayish-blue1 drop-shadow-2xl">
        <Image
          className="rounded-full"
          src={cocktailDetails.strDrinkThumb}
          alt="cocktail"
          width="130"
          height="130"
        />
        <div className="font-bold text-xl pt-4 text-bright-blue">
          {cocktailDetails.strDrink}
        </div>
        <div className="self-start font-bold pt-8 text-bright-blue">
          Ingredients:
        </div>
        <div className="flex justify-between w-full">
          <div className="flex flex-col">
            {ingredients.map(({ ingredient, measure, backgroundColor }) => {
              return (
                <div
                  key={ingredient}
                  className="flex items-center text-light-grayish-blue"
                >
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
        <div className="mt-7 text-light-grayish-blue">
          {cocktailDetails.strInstructions}
        </div>
      </div>
    </div>
  )
}
