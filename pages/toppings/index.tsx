import Head from 'next/head'
import useSWR, { useSWRConfig } from 'swr'
import { PlusIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'
import { ToppingListItem } from './ToppingListItem'

export default function Toppings() {
  const { data, isLoading } = useSWR('/api/topping')

  return (
    <div>
      <Head>
        <title>Hi Owner!</title>
        <meta name="description" content="Strongmind Fullstack exercise" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NewToppingInput />

      {isLoading ? null : <ToppingsList toppings={data.toppings} />}
    </div>
  )
}

const NewToppingInput = () => {
  const [error, setError] = useState('')
  const [name, setName] = useState('')
  const { mutate } = useSWRConfig()

  const handleNewToppingSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    setError('')

    if (!name) {
      setError('Input cannot be blank')
      return
    }

    try {
      const body = { name }

      const response = await fetch('/api/topping', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (response.status === 409) {
        throw new Error(`A topping named "${name}" already exists.`)
      }

      await mutate('/api/topping')
    } catch (err) {
      setError(err.message)
      console.error(err)
    }
  }

  return (
    <div className="mt-12">
      <label
        htmlFor="topping"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        New topping
      </label>
      <div className="mt-2 flex rounded-md shadow-sm">
        <div className="relative flex flex-grow items-stretch focus-within:z-10">
          <input
            type="text"
            value={name}
            name="topping"
            id="topping"
            className="block w-full rounded-none rounded-l-md border-0 py-1.5 pl-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6 outline-none"
            placeholder="Pepperoni"
            onChange={(event) => {
              setError('')
              setName(event.target.value)
            }}
          />
        </div>
        <button
          type="button"
          onClick={handleNewToppingSubmit}
          className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          <PlusIcon
            className="-ml-0.5 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
          Add
        </button>
      </div>
      <p className="mt-2 text-sm text-red-600" id="email-error">
        {error}
      </p>
    </div>
  )
}

const ToppingsList = ({ toppings }) => {
  return (
    <div className="mt-12 px-1">
      <ul role="list" className="-my-5 divide-y divide-gray-200">
        {toppings.map((topping) => (
          <ToppingListItem topping={topping} />
        ))}
      </ul>
    </div>
  )
}
