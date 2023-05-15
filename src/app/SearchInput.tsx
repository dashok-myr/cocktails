import Image from 'next/image'
import searchIcon from '@/icons/icons8-search.svg'
import deleteIcon from '@/icons/cross-svgrepo-com.svg'
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
    <div className="relative p-3">
      <div className="absolute inset-y-0 left-3 flex items-center pl-3 pointer-events-none">
        <Image className="w-5 h-5" src={searchIcon} alt="search" />
      </div>
      <input
        onChange={async (e) => {
          setSearchValue(e.target.value)
          debounced(e.target.value)
        }}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-8 p-2.5"
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
