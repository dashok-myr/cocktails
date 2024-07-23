import Image from 'next/image'
import searchIcon from '@/icons/search-icon.svg'
import deleteIcon from '@/icons/cross-icon.svg'
import React, { useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

interface ISearchInputProps {
  onDebouncedChange: (searchValue: string) => void
  onInputClear: () => void
}

export default function SearchInput({
  onDebouncedChange,
  onInputClear,
}: ISearchInputProps) {
  const [searchValue, setSearchValue] = useState('')

  const debounced = useDebouncedCallback((searchValue: string) => {
    onDebouncedChange(searchValue)
  }, 300)

  return (
      <div className="relative flex justify-center p-3 lg:w-[480px] mx-auto mb-10">
        <div className="absolute inset-y-0 left-3 flex items-center pl-3 pointer-events-none">
          <Image className="w-5 h-5" src={searchIcon} alt="search" />
        </div>
        <input
          onChange={async (e) => {
            setSearchValue(e.target.value)
            debounced(e.target.value)
          }}
          className="border border-pink-300 text-light-grayish-blue text-sm rounded-lg bg-dark-grayish-blue block w-full pl-9 p-2.5"
          placeholder="Find a drink"
          value={searchValue}
        />
        {searchValue && (
          <button
            className="absolute inset-y-0 right-6 flex items-center pl-3"
            onClick={() => {
              setSearchValue('')
              onInputClear()
            }}
          >
            <Image className="w-3 h-3" src={deleteIcon} alt="search" />
          </button>
        )}
      </div>
  )
}
