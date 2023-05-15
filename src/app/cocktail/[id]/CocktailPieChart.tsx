'use client'
import React from 'react'
import { ArcElement, Chart as ChartJS, Tooltip } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import {
  IngredientsInfo,
  Measure,
} from '@/app/cocktail/[id]/getAllIngredientsInfo'

ChartJS.register(ArcElement, Tooltip)

export type IngredientUnit =
  | 'cup'
  | 'tsp'
  | 'tbsp'
  | 'cl'
  | 'oz'
  | 'part'
  | 'parts'
  | 'dash'

const unitMap: Record<IngredientUnit, number> = {
  cup: 8,
  tsp: 1 / 6,
  tbsp: 0.5,
  cl: 0.33814,
  oz: 1,
  part: 1,
  parts: 1,
  dash: 0.0208,
}

function convertFractionToNumber(str: string) {
  const [numerator, denominator] = str.split('/')
  return parseInt(numerator) / parseInt(denominator)
}

function convertToNumber(str: string) {
  const isWholeNumber = /^\d+$/.test(str)
  if (isWholeNumber) {
    return parseInt(str)
  }

  const isDecimalNumber = /^\d+\.\d+$/.test(str)
  if (isDecimalNumber) {
    return parseFloat(str)
  }

  const isMixedNumber = /^\d+\s+\d+\/\d+$/.test(str)
  if (isMixedNumber) {
    const [whole, fraction] = str.split(' ')
    return parseInt(whole) + convertFractionToNumber(fraction)
  }

  const isFraction = /^\d+\/\d+$/.test(str)
  if (isFraction) {
    return convertFractionToNumber(str)
  }

  return null
}

function getMeasureValue(measure: Measure): null | number {
  const measureValue = measure.match(
    /(\d+(?:\.\d+)?(?:\s+\d+\/\d+)?(?:\/\d+)?)\b(?:(?=\s*-)|\b)/g
  )
  if (!measureValue) {
    return null
  }

  return convertToNumber(measureValue[0])
}

function getMeasureUnit(measure: Measure) {
  const measureUnit = measure.match(
    /(\b(cup|tsp|tbsp|cl|oz|part|parts|dash)\b)/g
  )
  if (!measureUnit) {
    return null
  }
  return measureUnit[0] as IngredientUnit
}

function convertToOz(measure: Measure) {
  const measureUnit = getMeasureUnit(measure)
  const amount = getMeasureValue(measure)

  if (
    !measureUnit ||
    !unitMap.hasOwnProperty(measureUnit) ||
    !amount ||
    isNaN(amount)
  ) {
    return null
  }

  return amount * unitMap[measureUnit]
}

function getPieChartData(ingredients: IngredientsInfo[]) {
  return {
    labels: ingredients
      .filter((ingredients) => ingredients.measure)
      .map((ingredient) => ingredient.ingredient),
    datasets: [
      {
        label: 'oz',
        data: ingredients
          .filter((ingredients) => ingredients.measure)
          .map((ingredient) => convertToOz(ingredient.measure)),
        backgroundColor: ingredients
          .filter((ingredients) => ingredients.measure)
          .map((ingredient) => ingredient.backgroundColor),
        borderColor: ingredients
          .filter((ingredients) => ingredients.measure)
          .map((ingredient) => ingredient.borderColor),
        borderWidth: 1,
      },
    ],
  }
}

interface ICocktailPieChartProps {
  ingredients: IngredientsInfo[]
}

export default function CocktailPieChart({
  ingredients,
}: ICocktailPieChartProps) {
  return (
    <div className="w-32 h-32">
      <Pie
        data={getPieChartData(ingredients)}
        options={{
          responsive: true,
        }}
        width={120}
        height={120}
      />
    </div>
  )
}
