'use client'
import React, { useState } from 'react'
import SearchInput from '@/app/SearchInput'
import CocktailSearchResult from '@/app/CocktailSearchResult'

export interface ICocktail {
  strDrink: string
  idDrink: string
  strDrinkThumb: string
}

const fetchCocktails = async (cocktailSearchValue: string) => {
  const data = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailSearchValue}`
  )
  return await data.json()
}
export default function Home() {
  const [cocktails, setCocktails] = useState<ICocktail[] | null>([])

  return (
    <main className="flex flex-col justify-center">
      <div className="text-center font-semibold p-3 bg-gray-100 w-full border-b-2">
        Thirsty
      </div>
      <div>
        <SearchInput
          onDebouncedChange={async (debouncedSearchValue: string) => {
            if (!debouncedSearchValue) {
              setCocktails([])
              return
            }
            const cocktailData = await fetchCocktails(debouncedSearchValue)
            setCocktails(cocktailData.drinks)
          }}
          onInputClear={() => {
            setCocktails([])
          }}
        />
        <CocktailSearchResult cocktails={cocktails} />
      </div>
    </main>
  )
}
