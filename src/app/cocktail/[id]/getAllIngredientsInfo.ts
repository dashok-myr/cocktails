import ICocktailDetails from '@/app/cocktail/[id]/ICocktailDetails'
import _ from 'underscore'
import { IngredientUnit } from '@/app/cocktail/[id]/CocktailPieChart'

type AllowedNumbers =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15

const backgroundColors = [
  'rgba(255,99,132,0.66)',
  'rgba(54,100,235,0.61)',
  'rgba(255,206,86,0.62)',
  'rgba(75,192,192,0.6)',
  'rgba(153,102,255,0.64)',
  'rgba(255,255,64,0.66)',
  'rgba(255,99,132,0.7)',
  'rgba(54,162,235,0.67)',
  'rgba(255,206,86,0.69)',
  'rgba(75,192,192,0.65)',
  'rgba(153,102,255,0.73)',
  'rgba(255,159,64,0.67)',
  'rgba(255,109,64,0.62)',
  'rgba(166,232,48,0.65)',
  'rgba(225,99,251,0.6)',
]

const borderColors = [
  'rgba(255, 99, 132, 1)',
  'rgb(36,89,255)',
  'rgb(255,202,65)',
  'rgb(90,255,255)',
  'rgb(133,75,255)',
  'rgb(255,255,0)',
  'rgb(255,0,56)',
  'rgb(35,170,255)',
  'rgb(250,188,46)',
  'rgb(0,255,255)',
  'rgb(86,0,255)',
  'rgb(255,126,0)',
  'rgb(253,56,0)',
  'rgb(172,255,0)',
  'rgb(211,52,255)',
]

export type Measure = `${number} ${IngredientUnit}`

export interface IngredientsInfo {
  ingredient: string
  measure: Measure
  backgroundColor: `rgba(${string})`
  borderColor: `rgba(${string})`
}

export default function getAllIngredientsInfo(
  cocktailDetails: ICocktailDetails
) {
  const ingredientsKeys = (
    Object.keys(cocktailDetails) as `strIngredient${AllowedNumbers}`[]
  ).filter((key) => {
    return key.includes('strIngredient')
  })

  const measureKeys = (
    Object.keys(cocktailDetails) as `strMeasure${AllowedNumbers}`[]
  ).filter((key) => {
    return key.includes('strMeasure')
  })

  const zippedKeys = _.zip(ingredientsKeys, measureKeys) as [
    `strIngredient${AllowedNumbers}`,
    `strMeasure${AllowedNumbers}`
  ][]

  return zippedKeys
    .map(([ingredientKey, measureKey], index) => {
      return {
        ingredient: cocktailDetails[ingredientKey],
        measure: cocktailDetails[measureKey]?.trim(),
        backgroundColor: backgroundColors[index],
        borderColor: borderColors[index],
      }
    })
    .filter(({ ingredient, measure }) => {
      return !!ingredient && !!measure
    }) as IngredientsInfo[] // cast because the filtering doesn't give the correct types even though i am filtering out null and undefined
}
