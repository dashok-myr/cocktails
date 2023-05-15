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
  'rgba(255, 99, 132, 0.2)',
  'rgba(54, 100, 235, 0.2)',
  'rgba(255, 206, 86, 0.2)',
  'rgba(75, 192, 192, 0.2)',
  'rgba(153, 102, 255, 0.2)',
  'rgba(255, 359, 64, 0.2)',
  'rgba(255, 99, 132, 0.2)',
  'rgba(54, 162, 235, 0.2)',
  'rgba(255, 206, 86, 0.2)',
  'rgba(75, 192, 192, 0.2)',
  'rgba(153, 102, 255, 0.2)',
  'rgba(255, 159, 64, 0.2)',
  'rgba(255, 109, 64, 0.2)',
  'rgba(125, 169, 34, 0.2)',
  'rgba(225, 99, 251, 0.2)',
]

const borderColors = [
  'rgba(255, 99, 132, 1)',
  'rgba(54, 100, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(255, 359, 64, 1)',
  'rgba(255, 99, 132, 1)',
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(255, 159, 64, 1)',
  'rgba(255, 109, 64, 1)',
  'rgba(125, 169, 34, 1)',
  'rgba(225, 99, 251, 1)',
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
      return !!ingredient || !!measure
    }) as IngredientsInfo[]
}
