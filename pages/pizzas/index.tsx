import useSWR, { useSWRConfig } from 'swr'
import Head from 'next/head'
import { useState } from 'react'
import { Modal } from '../../components'
import { Dialog } from '@headlessui/react'

export default function Pizzas() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <Head>
        <title>Hello Chef!</title>
        <meta name="description" content="Strongmind Fullstack exercise" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="mt-16">
        <button
          onClick={() => setIsOpen(true)}
          href="#"
          className="flex w-full items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold
                text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
        >
          Create new pizza
        </button>
        <List />
      </div>
      <CreatePizzaModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  )
}

const CreatePizzaModal = ({ isOpen, onClose }) => {
  const { mutate } = useSWRConfig()
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const { data, isLoading } = useSWR('/api/topping')
  const [toppingsMap, setToppingsMap] = useState({})
  const toppings = Object.keys(toppingsMap).filter((t) => !!toppingsMap[t])

  const handleNewPizzaSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    setError('')

    if (!name) {
      setError('Input cannot be blank')
      return
    }

    try {
      const body = { name, toppings }

      const response = await fetch('/api/pizza', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      await mutate('/api/pizza')
    } catch (err) {
      setError(err.message)
      console.error(err)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="mt-3 text-center sm:mt-5">
        <Dialog.Title
          as="h3"
          className="text-base font-semibold leading-6 text-gray-900"
        >
          Create new pizza
        </Dialog.Title>
      </div>
      <div className="my-8 flex-col">
        <label
          htmlFor="pizza"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Pizza name
        </label>
        <div className="mt-2 relative flex flex-grow items-stretch focus-within:z-10">
          <input
            type="text"
            placeholder="When the moon hits your eye..."
            value={name}
            name="pizza"
            id="pizza"
            className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6 outline-none"
            onChange={(event) => {
              setError('')
              setName(event.target.value)
            }}
          />
        </div>
        <p className="mt-2 text-sm text-red-600" id="email-error">
          {error}
        </p>

        {!isLoading && !!data ? (
          <fieldset className="mt-8 mb-12">
            <legend className="text-base font-semibold leading-6 text-gray-900">
              Toppings
            </legend>
            <div className="mt-4 divide-y divide-gray-200 border-b border-t border-gray-200">
              {data.toppings.map((topping) => (
                <div
                  key={topping.id}
                  className="relative flex items-start py-4"
                >
                  <div className="min-w-0 flex-1 text-sm leading-6">
                    <label
                      htmlFor={`topping-${topping.id}`}
                      className="select-none font-medium text-gray-900"
                    >
                      {topping.name}
                    </label>
                  </div>
                  <div className="ml-3 flex h-6 items-center">
                    <input
                      id={`topping-${topping.id}`}
                      name={topping.name}
                      type="checkbox"
                      onChange={(e) => {
                        setToppingsMap((toppings) => ({
                          ...toppings,
                          [e.target.name]: e.target.checked,
                        }))
                      }}
                      className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-600"
                    />
                  </div>
                </div>
              ))}
            </div>
          </fieldset>
        ) : null}
      </div>

      <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 sm:col-start-2"
          onClick={handleNewPizzaSubmit}
        >
          Save
        </button>
        <button
          type="button"
          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </Modal>
  )
}

const List = () => {
  const { data, isLoading } = useSWR('/api/pizza')

  if (isLoading) {
    return null
  }

  return (
    <div className="mt-12 px-1">
      <ul role="list" className="-my-5 divide-y divide-gray-200">
        {data.pizzas.map((pizza) => (
          <li key={pizza.id} className="py-4">
            <div className="flex items-center space-x-4">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900">
                  {pizza.name}
                </p>
                <p className="truncate text-sm text-gray-500">
                  {pizza.toppings.length} toppings
                </p>
              </div>
              <a
                href="#"
                className="inline-flex items-center rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Edit
              </a>
              <a
                href="#"
                className="inline-flex items-center rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-red-300 hover:bg-red-100"
              >
                Delete
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
